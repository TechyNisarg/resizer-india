import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { ImagePreview } from '../components/ImagePreview';
import { PresetSelector } from '../components/PresetSelector';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { PresetCategory, PresetType, Preset } from '../utils/presetData';
import { getPresetsByCategory } from '../utils/presetData';
import { Trash2, DownloadCloud } from 'lucide-react';

export const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [customWidth, setCustomWidth] = useState(420);
  const [customHeight, setCustomHeight] = useState(525);
  const [customMaxKB, setCustomMaxKB] = useState(20);

  const getInitialState = (): { cat: PresetCategory, type: PresetType } => {
    const path = location.pathname;
    if (path.includes('pan')) return { cat: 'pan', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('ssc')) return { cat: 'ssc', type: path.includes('signature') ? 'signature' : (path.includes('thumb') ? 'thumb' : 'photo') };
    if (path.includes('upsc')) return { cat: 'upsc', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('passport')) return { cat: 'passport', type: 'photo' };
    if (path.includes('custom')) return { cat: 'custom', type: 'custom' };
    return { cat: 'rto', type: path.includes('signature') ? 'signature' : 'photo' };
  };

  const [category, setCategory] = useState<PresetCategory>(getInitialState().cat);
  const [type, setType] = useState<PresetType>(getInitialState().type);

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
    updateUrl(category, t);
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

  const availablePresets = getPresetsByCategory(category);
  const activePresetBase = availablePresets.find(p => p.type === type) || availablePresets[0];

  const activePreset: Preset = category === 'custom' 
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
  } = useImageProcessor(activePreset);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>{activePreset?.buttonText || "Resize Image"}</h1>
      </div>

      <div className="workspace">
        <div className="sidebar">
          <PresetSelector 
            currentCategory={category} 
            onCategorySelect={handleCategorySelect}
            currentType={type}
            onTypeSelect={handleTypeSelect}
            availableTypes={availableTypes}
          />
          
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

          {!sourceImage ? (
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

          {downloadObjectURL && (
            <div className="card result-card">
              <h3>Success! 🎉</h3>
              <p style={{marginBottom: '0.5rem', color: 'var(--text-secondary)'}}>Original: <strong>{sourceSizeKB.toFixed(2)} KB</strong></p>
              <p style={{marginBottom: '1rem', color: 'var(--text-secondary)'}}>Compressed: <strong>{finalSizeKB.toFixed(2)} KB</strong></p>
              <a href={downloadObjectURL} download={`${activePreset?.filename || 'resized'}-${finalSizeKB.toFixed(2)}KB.jpg`} className="btn-primary" style={{ textDecoration: 'none' }}>
                <DownloadCloud size={20} />
                Download Image
              </a>
            </div>
          )}
        </div>

        <div className="main-content">
          {!sourceImage ? (
            <Dropzone onImageLoad={loadImage} isProcessing={isProcessing} />
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
