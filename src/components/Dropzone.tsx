import React, { useRef, useState } from 'react';
import { Upload, ShieldCheck } from 'lucide-react';

interface DropzoneProps {
  onImageLoad: (file: File) => void;
  isProcessing?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onImageLoad, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isProcessing) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;
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
      className={`dropzone ${isDragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => { if (!isProcessing) fileInputRef.current?.click(); }}
      style={{ opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? 'wait' : 'pointer' }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/jpeg, image/png, image/webp, image/heic, image/heif" 
        hidden 
      />
      <Upload size={48} className="upload-icon" />
      <h3>Tap to Upload or Drop Image Here</h3>
      <p>Supports JPG/JPEG, PNG, WebP, HEIC</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>
        <ShieldCheck size={18} />
        <span>100% Secure & Private. No server uploads.</span>
      </div>
      {isProcessing && <p style={{color: 'var(--primary)', fontWeight: 600}}>Loading & Converting...</p>}
    </div>
  );
};
