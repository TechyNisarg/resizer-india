import React from 'react';
import type { PresetId } from '../utils/presetData';

interface PresetSelectorProps {
  currentPreset: PresetId;
  onSelect: (id: PresetId) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ currentPreset, onSelect }) => {
  return (
    <div className="preset-selector">
      <button 
        className={`preset-btn ${currentPreset === 'photo' ? 'active' : ''}`}
        onClick={() => onSelect('photo')}
      >
        RTO Photo
      </button>
      <button 
        className={`preset-btn ${currentPreset === 'signature' ? 'active' : ''}`}
        onClick={() => onSelect('signature')}
      >
        Signature
      </button>
      <button 
        className={`preset-btn ${currentPreset === 'custom' ? 'active' : ''}`}
        onClick={() => onSelect('custom')}
      >
        Custom
      </button>
    </div>
  );
};
