import { useState, useRef, useEffect, useCallback } from 'react';
import type { Preset } from '../utils/presetData';
import ImageWorker from '../utils/worker?worker';
import type { Area } from 'react-easy-crop';

type ImageDimensions = {
  width: number;
  height: number;
};

export function useImageProcessor() {
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const workerRef = useRef<Worker | null>(null);

  const cleanupUrls = useCallback(() => {
    if (sourceObjectURL) URL.revokeObjectURL(sourceObjectURL);
    if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
  }, [sourceObjectURL, downloadObjectURL]);

  useEffect(() => {
    return () => {
      cleanupUrls();
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [cleanupUrls]);

  const loadImage = async (file: File, onLoaded?: (dimensions: ImageDimensions) => void) => {
    setError('');
    setIsProcessing(true);
    let finalBlob: Blob = file;

    try {
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
        const heic2anyModule = await import('heic2any');
        const heic2any = heic2anyModule.default || heic2anyModule;
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        finalBlob = Array.isArray(converted) ? converted[0] : converted;
      } else if (file.type === 'image/png' || file.type === 'image/webp') {
        // Convert PNG/WebP to JPEG via canvas
        finalBlob = await new Promise<Blob>((resolve, reject) => {
          const img = new Image();
          const objUrl = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              canvas.toBlob((b) => {
                if (b) resolve(b);
                else reject(new Error("Canvas toBlob failed"));
                // Strictly free memory
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = 0;
                canvas.height = 0;
              }, 'image/jpeg', 1.0);
            }
            URL.revokeObjectURL(objUrl);
          };
          img.onerror = () => reject(new Error("Image load failed"));
          img.src = objUrl;
        });
      }

      cleanupUrls(); // free old previews
      
      const url = URL.createObjectURL(finalBlob);
      setSourceObjectURL(url);
      setSourceSizeKB(finalBlob.size / 1024);

      const img = new Image();
      img.onload = () => {
        onLoaded?.({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        });
        setSourceImage(img);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setDownloadObjectURL('');
        setIsProcessing(false);
      };
      img.onerror = () => {
        setError("Could not read this image.");
        setIsProcessing(false);
        URL.revokeObjectURL(url);
      };
      img.src = url;

    } catch {
      setError("Failed to load and convert image. Ensure it is a valid format.");
      setIsProcessing(false);
    }
  };

  const clearImage = () => {
    cleanupUrls();
    setSourceImage(null);
    setSourceObjectURL('');
    setDownloadObjectURL('');
    setError('');
    setCroppedAreaPixels(null);
  };

  const clearResult = () => {
    if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
    setDownloadObjectURL('');
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processImage = async (activePreset: Preset, overlayName?: string, overlayDate?: string) => {
    if (!sourceImage || !croppedAreaPixels) return;
    setIsProcessing(true);
    setError('');
    setDownloadObjectURL('');
    
    try {
      const bitmap = await createImageBitmap(sourceImage);
      const rect = {
        sx: croppedAreaPixels.x,
        sy: croppedAreaPixels.y,
        sw: croppedAreaPixels.width,
        sh: croppedAreaPixels.height
      };
      const presetForWorker = { 
        ...activePreset, 
        rect, 
        overlayName, 
        overlayDate 
      };

      if (workerRef.current) workerRef.current.terminate();
      workerRef.current = new ImageWorker();
      
      workerRef.current.onmessage = async (e) => {
        const data = e.data;
        if (!data.success || !data.blob) {
          setError(data.error || "Failed to compress image.");
          setIsProcessing(false);
          return;
        }

        if (downloadObjectURL) URL.revokeObjectURL(downloadObjectURL);
        const url = URL.createObjectURL(data.blob);
        setDownloadObjectURL(url);
        setFinalSizeKB(data.blob.size / 1024);
        setIsProcessing(false);
      };

      workerRef.current.onerror = () => {
        setError("Error processing image in worker.");
        setIsProcessing(false);
      };

      workerRef.current.postMessage({ imageBitmap: bitmap, preset: presetForWorker }, [bitmap]);
    } catch {
      setError("Failed to start processing.");
      setIsProcessing(false);
    }
  };

  return {
    sourceImage,
    sourceObjectURL,
    loadImage,
    clearImage,
    processImage,
    isProcessing,
    error,
    crop, setCrop,
    zoom, setZoom,
    onCropComplete,
    downloadObjectURL,
    sourceSizeKB,
    finalSizeKB,
    clearResult
  };
}
