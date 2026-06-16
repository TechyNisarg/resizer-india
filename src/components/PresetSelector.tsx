import React from 'react';
import type { PresetCategory, PresetType } from '../utils/presetData';
import { User, PenTool, Fingerprint, FileText, ImageIcon, Sliders } from 'lucide-react';

interface PresetSelectorProps {
  currentCategory: PresetCategory;
  onCategorySelect: (cat: PresetCategory) => void;
  currentType: PresetType;
  onTypeSelect: (type: PresetType) => void;
  availableTypes: { type: PresetType, label: string }[];
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  photo: User,
  signature: PenTool,
  thumb: Fingerprint,
  handwritten: FileText,
  postcard: ImageIcon,
  custom: Sliders
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  currentCategory, currentType, onTypeSelect, availableTypes
}) => {
  if (availableTypes.length <= 1 || currentCategory === 'custom') {
    return null;
  }

  return (
    <div className="preset-selector card">
      <div className="preset-row">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Image Type</label>
        <div className="pills-container">
          {availableTypes.map(t => {
            const TypeIcon = TYPE_ICONS[t.type as string];
            return (
              <button
                key={t.type}
                className={`pill-btn ${currentType === t.type ? 'active' : ''}`}
                onClick={() => onTypeSelect(t.type)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {TypeIcon && <TypeIcon size={16} />}
                <span style={{ position: 'relative', top: '-1px' }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
