import React from 'react';

interface ImagePreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ canvasRef, width, height }) => {
  return (
    <div className="preview-wrapper">
      <div className="preview-inner">
        <canvas 
          ref={canvasRef} 
          width={width} 
          height={height}
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      </div>
    </div>
  );
};
