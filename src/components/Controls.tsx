import React from 'react';
import { RotateCcw, Trash2, DownloadCloud } from 'lucide-react';

interface ControlsProps {
  onRotate: () => void;
  onClear: () => void;
  onProcess: () => void;
  isProcessing: boolean;
  buttonText: string;
}

export const Controls: React.FC<ControlsProps> = ({
  onRotate, onClear, onProcess, isProcessing, buttonText
}) => {
  return (
    <div className="controls-container card">
      <div className="control-actions">
        <button className="btn-secondary" onClick={onRotate} title="Rotate 90°">
          <RotateCcw size={20} />
          <span>Rotate</span>
        </button>
        <button className="btn-danger" onClick={onClear} title="Clear Image">
          <Trash2 size={20} />
          <span>Clear</span>
        </button>
      </div>

      <button 
        className={`btn-primary process-btn ${isProcessing ? 'processing' : ''}`}
        onClick={onProcess}
        disabled={isProcessing}
      >
        <DownloadCloud size={20} />
        <span>{isProcessing ? 'Processing...' : buttonText}</span>
      </button>
    </div>
  );
};
