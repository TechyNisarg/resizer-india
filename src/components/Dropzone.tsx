import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropzoneProps {
  onImageLoad: (file: File) => void;
  isProcessing?: boolean;
  disabled?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onImageLoad, isProcessing, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isProcessing && !disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing || disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageLoad(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageLoad(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`dropzone ${isDragOver ? 'dragover' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => { if (!isProcessing && !disabled) fileInputRef.current?.click(); }}
      style={{ 
        opacity: isProcessing || disabled ? 0.6 : 1, 
        cursor: isProcessing ? 'wait' : disabled ? 'not-allowed' : 'pointer',
        filter: disabled ? 'grayscale(100%)' : 'none'
      }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/jpeg, image/png, image/webp, image/heic, image/heif" 
        hidden 
        disabled={disabled || isProcessing}
      />
      <UploadCloud size={48} className="upload-icon" style={{ opacity: disabled ? 0.4 : 1 }} />
      {disabled ? (
        <>
          <h3>Upload Disabled</h3>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>👈 Please select a form category first</p>
        </>
      ) : (
        <>
          <h3>Tap to Upload or Drop Image Here</h3>
          <p>Supports JPEG, JPG, PNG, WebP, HEIC</p>
        </>
      )}
      {isProcessing && <p style={{color: 'var(--primary)', fontWeight: 600}}>Loading & Converting...</p>}
    </div>
  );
};
