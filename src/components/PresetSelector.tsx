import React from 'react';
import type { PresetCategory, PresetType } from '../utils/presetData';

interface PresetSelectorProps {
  currentCategory: PresetCategory;
  onCategorySelect: (cat: PresetCategory) => void;
  currentType: PresetType;
  onTypeSelect: (type: PresetType) => void;
  availableTypes: { type: PresetType, label: string }[];
}

const CATEGORIES: { id: PresetCategory, label: string }[] = [
  { id: 'rto', label: 'RTO / Parivahan' },
  { id: 'pan', label: 'PAN Card' },
  { id: 'passport', label: 'Passport Size' },
  { id: 'ssc', label: 'SSC Exams' },
  { id: 'upsc', label: 'UPSC Exams' },
  { id: 'custom', label: 'Custom Size' },
];

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  currentCategory, onCategorySelect, currentType, onTypeSelect, availableTypes
}) => {
  return (
    <div className="preset-selector card">
      <div className="preset-row">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Select Form Category</label>
        <select 
          value={currentCategory} 
          onChange={e => onCategorySelect(e.target.value as PresetCategory)}
          style={{ width: '100%', padding: '0 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--surface-solid)' }}
        >
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {availableTypes.length > 0 && currentCategory !== 'custom' && (
        <div className="preset-row">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Image Type</label>
          <div className="pills-container">
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
        </div>
      )}
    </div>
  );
};
