import React from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface ImagePreviewProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  hasFaceGuide?: boolean;
  onCropChange: (crop: { x: number; y: number }) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onZoomChange: (zoom: number) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageSrc, crop, zoom, aspect, hasFaceGuide, onCropChange, onCropComplete, onZoomChange
}) => {
  return (
    <div className="cropper-wrapper">
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
      {hasFaceGuide && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Faint Dotted SVG silhouette oval for Face Guide */}
          <svg viewBox="0 0 100 100" style={{ width: '40%', height: 'auto', opacity: 0.6, maxWidth: '200px' }}>
             <ellipse cx="50" cy="50" rx="35" ry="45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
             <line x1="50" y1="5" x2="50" y2="15" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
             <line x1="50" y1="85" x2="50" y2="95" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
             <line x1="5" y1="50" x2="15" y2="50" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
             <line x1="85" y1="50" x2="95" y2="50" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        </div>
      )}
    </div>
  );
};
