import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { ImagePreview } from '../components/ImagePreview';
import { PresetSelector } from '../components/PresetSelector';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { PresetCategory, PresetType, Preset } from '../utils/presetData';
import { getPresetsByCategory } from '../utils/presetData';
import { Trash2, DownloadCloud } from 'lucide-react';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Select Format', 'Upload Image', 'Adjust', 'Download'];
  return (
    <div className="step-indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: '100%', overflowX: 'auto', padding: '0.5rem' }}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isPast = stepNum < currentStep;
        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: isActive || isPast ? 1 : 0.5, minWidth: '60px' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                background: isActive ? 'var(--primary)' : isPast ? '#10b981' : 'var(--surface-solid)',
                color: isActive || isPast ? 'white' : 'var(--text-secondary)',
                border: `2px solid ${isActive ? 'var(--primary)' : isPast ? '#10b981' : 'var(--border-color)'}`,
                fontWeight: 'bold', transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}>
                {isPast ? '✓' : stepNum}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ height: '2px', width: '40px', background: isPast ? '#10b981' : 'var(--border-color)', alignSelf: 'flex-start', marginTop: '15px', transition: 'all 0.3s ease', flexShrink: 0 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [customWidth, setCustomWidth] = useState(420);
  const [customHeight, setCustomHeight] = useState(525);
  const [customMaxKB, setCustomMaxKB] = useState(20);

  const getInitialState = (): { cat: PresetCategory | null, type: PresetType | null } => {
    const path = location.pathname;
    if (path.includes('pan')) return { cat: 'pan', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('ssc')) return { cat: 'ssc', type: path.includes('signature') ? 'signature' : (path.includes('thumb') ? 'thumb' : 'photo') };
    if (path.includes('upsc')) return { cat: 'upsc', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('passport')) return { cat: 'passport', type: 'photo' };
    if (path.includes('custom')) return { cat: 'custom', type: 'custom' };
    if (path.includes('rto')) return { cat: 'rto', type: path.includes('signature') ? 'signature' : 'photo' };
    return { cat: null, type: null };
  };

  const [category, setCategory] = useState<PresetCategory | null>(getInitialState().cat);
  const [type, setType] = useState<PresetType | null>(getInitialState().type);

  useEffect(() => {
    const st = getInitialState();
    setCategory(st.cat);
    setType(st.type);
  }, [location.pathname]);

  const handleCategorySelect = (cat: PresetCategory) => {
    setCategory(cat);
    const newType = cat === 'custom' ? 'custom' : 'photo';
    setType(newType);
    updateUrl(cat, newType);
  };

  const handleTypeSelect = (t: PresetType) => {
    setType(t);
    if (category) updateUrl(category, t);
  };

  const updateUrl = (cat: PresetCategory, t: PresetType) => {
    if (cat === 'custom') navigate('/custom-resizer');
    else if (cat === 'rto') navigate(`/rto-${t}-resizer`);
    else if (cat === 'pan') navigate(`/pan-card-${t}-resizer`);
    else if (cat === 'ssc') navigate(`/ssc-${t}-resizer`);
    else if (cat === 'upsc') navigate(`/upsc-${t}-resizer`);
    else if (cat === 'passport') navigate(`/passport-photo-resizer`);
    else navigate('/');
  };

  const availablePresets = category ? getPresetsByCategory(category) : [];
  const activePresetBase = availablePresets.find(p => p.type === type) || availablePresets[0] || null;

  const activePreset: Preset | null = category === 'custom' && activePresetBase
    ? { ...activePresetBase, width: customWidth, height: customHeight, maxKB: customMaxKB }
    : activePresetBase;

  const availableTypes = availablePresets.map(p => ({
    type: p.type,
    label: p.type === 'photo' ? 'Photo' : p.type === 'signature' ? 'Signature' : p.type === 'thumb' ? 'Thumb Impression' : 'Custom'
  }));

  const {
    sourceImage, sourceObjectURL, loadImage, clearImage, processImage,
    isProcessing, error, crop, setCrop, zoom, setZoom, onCropComplete,
    downloadObjectURL, sourceSizeKB, finalSizeKB
  } = useImageProcessor(activePreset || getPresetsByCategory('rto')[0]);

  let currentStep = 1;
  if (category) currentStep = 2;
  if (sourceImage && category && !downloadObjectURL) currentStep = 3;
  if (downloadObjectURL) currentStep = 4;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>{activePreset?.buttonText || "Resize Image"}</h1>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="workspace">
        <div className="sidebar">
          <div style={{ position: 'relative' }}>
            {!category && (
              <div style={{ position: 'absolute', right: '-40px', top: '24px', animation: 'bounceX 1s infinite', zIndex: 10 }}>
                <span style={{ fontSize: '2rem' }}>👈</span>
              </div>
            )}
            <PresetSelector 
              currentCategory={category} 
              onCategorySelect={handleCategorySelect}
              currentType={type}
              onTypeSelect={handleTypeSelect}
              availableTypes={availableTypes}
            />
          </div>
          
          {category === 'custom' && (
            <div className="card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Width (px) 
                  <input type="number" value={customWidth} onChange={e => setCustomWidth(Number(e.target.value) || 1)} style={{ width: '120px', padding: '0 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Height (px) 
                  <input type="number" value={customHeight} onChange={e => setCustomHeight(Number(e.target.value) || 1)} style={{ width: '120px', padding: '0 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Max Size (KB) 
                  <input type="number" value={customMaxKB} onChange={e => setCustomMaxKB(Number(e.target.value) || 1)} style={{ width: '120px', padding: '0 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
                </label>
              </div>
            </div>
          )}

          {!category ? (
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Welcome to Resizer India</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Please select a category from the menu above to see requirements.</p>
            </div>
          ) : !sourceImage ? (
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Requirements</h2>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activePreset?.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="card controls">
              <div className="controls-row">
                <button className="btn-danger" onClick={clearImage} title="Clear Image">
                  <Trash2 size={20} />
                  <span>Clear</span>
                </button>
              </div>

              <button 
                className={`btn-primary ${isProcessing ? 'processing' : ''}`}
                onClick={processImage}
                disabled={isProcessing}
              >
                <DownloadCloud size={24} />
                <span>{isProcessing ? 'Processing...' : activePreset?.buttonText || 'Resize'}</span>
              </button>
            </div>
          )}

          {error && <div className="error-toast">{error}</div>}
        </div>

        <div className="main-content">
          {!sourceImage ? (
            <Dropzone onImageLoad={loadImage} isProcessing={isProcessing} disabled={!category} />
          ) : downloadObjectURL ? (
            <div className="card result-view" style={{ textAlign: 'center', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <h2 style={{ color: '#10b981', fontSize: '2rem', marginBottom: '1rem' }}>Success! 🎉</h2>
              <img src={downloadObjectURL} alt="Resized" style={{ maxWidth: '100%', maxHeight: '40vh', margin: '0 auto 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                 <div>
                   <p style={{ color: 'var(--text-secondary)' }}>Original Size</p>
                   <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{sourceSizeKB.toFixed(2)} KB</p>
                 </div>
                 <div>
                   <p style={{ color: 'var(--text-secondary)' }}>Compressed Size</p>
                   <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#10b981' }}>{finalSizeKB.toFixed(2)} KB</p>
                 </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
                <a href={downloadObjectURL} download={`${activePreset?.filename || 'resized'}-${finalSizeKB.toFixed(2)}KB.jpg`} className="btn-primary" style={{ width: '100%', textDecoration: 'none', padding: '1.25rem', fontSize: '1.2rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
                  <DownloadCloud size={28} />
                  Download Image
                </a>
              </div>
            </div>
          ) : (
            <ImagePreview 
              imageSrc={sourceObjectURL}
              crop={crop}
              zoom={zoom}
              aspect={activePreset.width / activePreset.height}
              hasFaceGuide={activePreset.hasFaceGuide}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
      </div>
      
      {!sourceImage && (
        <div className="seo-text" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Why use Resizer India?</h2>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            Whether you are applying for SSC exams, UPSC civil services, or updating your PAN Card and Parivahan documents, strict image size restrictions apply. 
            Resizer India is a 100% free, browser-based tool that effortlessly crops your photos to exact pixel dimensions and aggressively compresses them to hit 10KB, 20KB, or 50KB limits 
            without losing visual quality. Perfect for signature uploads and passport size photo making.
          </p>
        </div>
      )}
    </div>
  );
};
