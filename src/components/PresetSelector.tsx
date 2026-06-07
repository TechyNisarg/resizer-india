import React, { useState, useRef, useEffect } from 'react';
import type { PresetCategory, PresetType } from '../utils/presetData';
import { ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCategoryLabel = CATEGORIES.find(c => c.id === currentCategory)?.label;

  return (
    <div className="preset-selector card">
      <div className="preset-row">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Select Form Category</label>
        
        <div className="custom-dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            className="dropdown-trigger" 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
              background: 'var(--surface-solid)', cursor: 'pointer', textAlign: 'left',
              color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem',
              transition: 'all 0.2s ease', outline: 'none', height: '48px'
            }}
          >
            <span>{currentCategoryLabel}</span>
            <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-secondary)' }} />
          </button>
          
          {isOpen && (
            <div 
              className="dropdown-menu" 
              style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
                background: 'var(--surface-solid)', borderRadius: '12px', border: '1px solid var(--border-color)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden'
              }}
            >
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onCategorySelect(c.id);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%', padding: '0.85rem 1rem', textAlign: 'left', cursor: 'pointer',
                    background: currentCategory === c.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: currentCategory === c.id ? 'var(--primary)' : 'var(--text-secondary)',
                    border: 'none', fontWeight: currentCategory === c.id ? 600 : 500,
                    transition: 'background 0.2s ease', minHeight: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (currentCategory !== c.id) e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    if (currentCategory !== c.id) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
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
