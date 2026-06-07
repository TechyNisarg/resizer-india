import React, { useState, useRef, useEffect } from 'react';
import type { PresetCategory, PresetType } from '../utils/presetData';
import { ChevronDown, Car, CreditCard, Plane, BookOpen, Sliders, User, PenTool, Fingerprint } from 'lucide-react';

interface PresetSelectorProps {
  currentCategory: PresetCategory;
  onCategorySelect: (cat: PresetCategory) => void;
  currentType: PresetType;
  onTypeSelect: (type: PresetType) => void;
  availableTypes: { type: PresetType, label: string }[];
}

const CATEGORIES: { id: PresetCategory, label: string, icon: React.ElementType }[] = [
  { id: 'rto', label: 'RTO / Parivahan', icon: Car },
  { id: 'pan', label: 'PAN Card', icon: CreditCard },
  { id: 'passport', label: 'Passport Size', icon: Plane },
  { id: 'ssc', label: 'SSC Exams', icon: BookOpen },
  { id: 'upsc', label: 'UPSC Exams', icon: BookOpen },
  { id: 'custom', label: 'Custom Size', icon: Sliders },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  photo: User,
  signature: PenTool,
  thumb: Fingerprint,
  custom: Sliders
};

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

  const currentCategoryObj = CATEGORIES.find(c => c.id === currentCategory);
  const CurrentIcon = currentCategoryObj?.icon;

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {CurrentIcon && <CurrentIcon size={18} style={{ color: 'var(--primary)' }} />}
              <span>{currentCategoryObj?.label}</span>
            </div>
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
              {CATEGORIES.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onCategorySelect(c.id);
                      setIsOpen(false);
                    }}
                    style={{
                      width: '100%', padding: '0.85rem 1rem', textAlign: 'left', cursor: 'pointer',
                      background: currentCategory === c.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      color: currentCategory === c.id ? 'var(--primary)' : 'var(--text-primary)',
                      border: 'none', fontWeight: currentCategory === c.id ? 600 : 500,
                      fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      transition: 'background 0.2s ease', minHeight: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      if (currentCategory !== c.id) e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      if (currentCategory !== c.id) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icon size={18} style={{ color: currentCategory === c.id ? 'var(--primary)' : 'var(--text-secondary)' }} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {availableTypes.length > 0 && currentCategory !== 'custom' && (
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
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
