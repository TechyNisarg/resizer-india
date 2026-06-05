import React from 'react';
import Cropper from 'react-easy-crop';

interface ImagePreviewProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  onZoomChange: (zoom: number) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageSrc, crop, zoom, aspect, onCropChange, onCropComplete, onZoomChange
}) => {
  return (
    <div className="cropper-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
        showGrid={true}
      />
    </div>
  );
};
