import React from 'react';
import { CATEGORIES } from '../utils/presetData';
import type { PresetCategory, PresetType } from '../utils/presetData';

interface PresetSelectorProps {
  currentCategory: PresetCategory;
  onCategorySelect: (cat: PresetCategory) => void;
  currentType: PresetType;
  onTypeSelect: (type: PresetType) => void;
  availableTypes: { type: PresetType, label: string }[];
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ 
  currentCategory, onCategorySelect, 
  currentType, onTypeSelect,
  availableTypes
}) => {
  return (
    <div className="preset-selector-complex">
      <div className="category-select">
        <label>Select Form Type</label>
        <select 
          value={currentCategory} 
          onChange={(e) => onCategorySelect(e.target.value as PresetCategory)}
        >
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>
      
      {availableTypes.length > 0 && currentCategory !== 'custom' && (
        <div className="type-pills">
          {availableTypes.map(t => (
            <button 
              key={t.type}
              className={`pill-btn ${currentType === t.type ? 'active' : ''}`}
              onClick={() => onTypeSelect(t.type)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
