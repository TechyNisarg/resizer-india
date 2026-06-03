import { useState, useRef, useEffect, useCallback } from 'react';
import type { Preset } from '../utils/presetData';
import { padJpegToMinimum } from '../utils/jpegPadder';
import ImageWorker from '../utils/worker?worker';

export interface CropRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

export function useImageProcessor(preset: Preset) {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [sourceObjectURL, setSourceObjectURL] = useState<string>('');
  const [downloadObjectURL, setDownloadObjectURL] = useState<string>('');
  const [sourceSizeKB, setSourceSizeKB] = useState(0);
  const [finalSizeKB, setFinalSizeKB] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (sourceObjectURL) URL.revokeObjectURL(sourceObjectURL);
      if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [sourceObjectURL, downloadObjectURL]);

  const loadImage = (file: File) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG or WebP image.");
      return;
    }
    setError('');
    const url = URL.createObjectURL(file);
    if (sourceObjectURL) URL.revokeObjectURL(sourceObjectURL);
    setSourceObjectURL(url);
    setSourceSizeKB(file.size / 1024);

    const img = new Image();
    img.onload = () => {
      setSourceImage(img);
      setZoom(1);
      setPanX(0);
      setPanY(0);
      setDownloadObjectURL('');
    };
    img.onerror = () => {
      setError("Could not read this image.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const clearImage = () => {
    setSourceImage(null);
    if (sourceObjectURL) URL.revokeObjectURL(sourceObjectURL);
    if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
    setSourceObjectURL('');
    setDownloadObjectURL('');
    setError('');
  };

  const rotateImage90 = async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = sourceImage.naturalHeight;
      canvas.height = sourceImage.naturalWidth;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No context");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(sourceImage, -sourceImage.naturalWidth / 2, -sourceImage.naturalHeight / 2);
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => b ? resolve(b) : reject(), "image/png");
      });
      
      const newUrl = URL.createObjectURL(blob);
      if (sourceObjectURL) URL.revokeObjectURL(sourceObjectURL);
      setSourceObjectURL(newUrl);
      setSourceSizeKB(blob.size / 1024);
      
      const newImg = new Image();
      newImg.onload = () => {
        setSourceImage(newImg);
        setIsProcessing(false);
      };
      newImg.src = newUrl;
    } catch (e) {
      setError("Failed to rotate image.");
      setIsProcessing(false);
    }
  };

  const calculateRect = (): CropRect => {
    if (!sourceImage) return { sx: 0, sy: 0, sw: 0, sh: 0 };
    const imageRatio = sourceImage.naturalWidth / sourceImage.naturalHeight;
    const targetRatio = preset.width / preset.height;
    let baseWidth = sourceImage.naturalWidth;
    let baseHeight = sourceImage.naturalHeight;

    if (imageRatio > targetRatio) baseWidth = sourceImage.naturalHeight * targetRatio;
    else baseHeight = sourceImage.naturalWidth / targetRatio;

    const cropWidth = baseWidth / zoom;
    const cropHeight = baseHeight / zoom;
    const maxX = sourceImage.naturalWidth - cropWidth;
    const maxY = sourceImage.naturalHeight - cropHeight;
    
    return {
      sx: Math.max(0, Math.min(maxX, (maxX / 2) + ((panX / 100) * maxX / 2))),
      sy: Math.max(0, Math.min(maxY, (maxY / 2) + ((panY / 100) * maxY / 2))),
      sw: cropWidth,
      sh: cropHeight
    };
  };

  const renderPreview = useCallback(() => {
    if (!sourceImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = calculateRect();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, preset.width, preset.height);
    
    ctx.drawImage(
      sourceImage,
      rect.sx, rect.sy, rect.sw, rect.sh,
      0, 0, preset.width, preset.height
    );
  }, [sourceImage, preset, zoom, panX, panY]);

  useEffect(() => {
    let animationFrameId: number;
    const render = () => {
      renderPreview();
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderPreview]);

  const processImage = async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setError('');
    
    try {
      const bitmap = await createImageBitmap(sourceImage);
      const rect = calculateRect();
      const presetForWorker = { ...preset, rect };

      if (workerRef.current) workerRef.current.terminate();
      workerRef.current = new ImageWorker();
      
      workerRef.current.onmessage = async (e) => {
        let finalBlob = e.data.blob;
        if (!e.data.success || !finalBlob) {
          setError("Could not compress below target size.");
          setIsProcessing(false);
          return;
        }

        finalBlob = await padJpegToMinimum(finalBlob, preset.minKB);
        const url = URL.createObjectURL(finalBlob);
        if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
        setDownloadObjectURL(url);
        setFinalSizeKB(finalBlob.size / 1024);
        setIsProcessing(false);
      };

      workerRef.current.onerror = () => {
        setError("Error processing image in worker.");
        setIsProcessing(false);
      };

      workerRef.current.postMessage({ imageBitmap: bitmap, preset: presetForWorker }, [bitmap]);
    } catch (e) {
      setError("Failed to start processing.");
      setIsProcessing(false);
    }
  };

  return {
    sourceImage,
    canvasRef,
    loadImage,
    clearImage,
    rotateImage90,
    processImage,
    isProcessing,
    error,
    zoom, setZoom,
    panX, setPanX,
    panY, setPanY,
    downloadObjectURL,
    sourceSizeKB,
    finalSizeKB
  };
}
