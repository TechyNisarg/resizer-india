import React from 'react';
import { RotateCcw, Download, XCircle } from 'lucide-react';

interface ControlsProps {
  zoom: number;
  setZoom: (z: number) => void;
  panX: number;
  setPanX: (x: number) => void;
  panY: number;
  setPanY: (y: number) => void;
  onRotate: () => void;
  onClear: () => void;
  onProcess: () => void;
  isProcessing: boolean;
  buttonText: string;
}

export const Controls: React.FC<ControlsProps> = ({
  zoom, setZoom,
  panX, setPanX,
  panY, setPanY,
  onRotate, onClear, onProcess,
  isProcessing, buttonText
}) => {
  return (
    <div className="controls-panel">
      <div className="slider-group">
        <div className="slider-header">
          <label>Zoom</label>
          <div className="slider-actions">
            <output>{zoom.toFixed(2)}x</output>
            <button onClick={() => setZoom(1)} className="reset-btn" title="Reset Zoom">↺</button>
          </div>
        </div>
        <input 
          type="range" 
          min="1" max="3" step="0.01" 
          value={zoom} 
          onChange={e => setZoom(parseFloat(e.target.value))} 
        />
      </div>
      
      <div className="slider-group">
        <div className="slider-header">
          <label>Pan X (Horizontal)</label>
          <div className="slider-actions">
            <output>{panX}%</output>
            <button onClick={() => setPanX(0)} className="reset-btn" title="Reset Pan X">↺</button>
          </div>
        </div>
        <input 
          type="range" 
          min="-100" max="100" step="1" 
          value={panX} 
          onChange={e => setPanX(parseFloat(e.target.value))} 
        />
      </div>

      <div className="slider-group">
        <div className="slider-header">
          <label>Pan Y (Vertical)</label>
          <div className="slider-actions">
            <output>{panY}%</output>
            <button onClick={() => setPanY(0)} className="reset-btn" title="Reset Pan Y">↺</button>
          </div>
        </div>
        <input 
          type="range" 
          min="-100" max="100" step="1" 
          value={panY} 
          onChange={e => setPanY(parseFloat(e.target.value))} 
        />
      </div>
      
      <div className="action-buttons">
        <button onClick={onRotate} disabled={isProcessing} className="btn-secondary">
          <RotateCcw size={16} /> Rotate
        </button>
        <button onClick={onClear} disabled={isProcessing} className="btn-danger">
          <XCircle size={16} /> Clear
        </button>
      </div>

      <button 
        onClick={onProcess} 
        disabled={isProcessing} 
        className={`btn-primary ${isProcessing ? 'processing' : ''}`}
      >
        <Download size={18} /> 
        {isProcessing ? 'Processing...' : buttonText}
      </button>
    </div>
  );
};
