import { useState, useRef, useEffect, useCallback } from 'react';
import type { Preset } from '../utils/presetData';
import { padJpegToMinimum, setJpegDpi } from '../utils/jpegPadder';
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

  // react-easy-crop states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{x: number, y: number, width: number, height: number} | null>(null);

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
      setCrop({ x: 0, y: 0 });
      setZoom(1);
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
    setCroppedAreaPixels(null);
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

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processImage = async () => {
    if (!sourceImage || !croppedAreaPixels) return;
    setIsProcessing(true);
    setError('');
    
    try {
      const bitmap = await createImageBitmap(sourceImage);
      const rect = {
        sx: croppedAreaPixels.x,
        sy: croppedAreaPixels.y,
        sw: croppedAreaPixels.width,
        sh: croppedAreaPixels.height
      };
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

        if (preset.dpi) {
          finalBlob = await setJpegDpi(finalBlob, preset.dpi);
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
    sourceObjectURL,
    loadImage,
    clearImage,
    rotateImage90,
    processImage,
    isProcessing,
    error,
    crop, setCrop,
    zoom, setZoom,
    onCropComplete,
    downloadObjectURL,
    sourceSizeKB,
    finalSizeKB
  };
}
