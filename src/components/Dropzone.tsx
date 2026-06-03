import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropzoneProps {
  onImageLoad: (file: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onImageLoad }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
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
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/jpeg, image/png, image/webp" 
        hidden 
      />
      <UploadCloud size={48} className="upload-icon" />
      <h3>Drag & Drop your image here</h3>
      <p>or click to browse (JPG, PNG, WebP)</p>
    </div>
  );
};
