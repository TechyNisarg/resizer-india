import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { ImagePreview } from '../components/ImagePreview';
import { PresetSelector } from '../components/PresetSelector';
import { LandingPage } from '../components/LandingPage';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { PresetCategory, PresetType, Preset } from '../utils/presetData';
import { getPresetsByCategory } from '../utils/presetData';
import { Trash2, DownloadCloud, ShieldCheck, Home as HomeIcon } from 'lucide-react';

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
    if (path.includes('ibps')) return { cat: 'ibps', type: path.includes('signature') ? 'signature' : (path.includes('thumb') ? 'thumb' : (path.includes('declaration') ? 'handwritten' : 'photo')) };
    if (path.includes('rrb')) return { cat: 'rrb', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('neet')) return { cat: 'neet', type: path.includes('signature') ? 'signature' : (path.includes('thumb') ? 'thumb' : (path.includes('postcard') ? 'postcard' : 'photo')) };
    if (path.includes('acpc')) return { cat: 'acpc', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('custom')) return { cat: 'custom', type: 'custom' };
    return { cat: 'rto', type: path.includes('signature') ? 'signature' : 'photo' };
  };

  const [category, setCategory] = useState<PresetCategory>(getInitialState().cat);
  const [type, setType] = useState<PresetType>(getInitialState().type);

  useEffect(() => {
    const st = getInitialState();
    setCategory(st.cat);
    setType(st.type);
    window.scrollTo(0, 0);
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
    else if (cat === 'ibps') {
      if (t === 'handwritten') navigate(`/ibps-declaration-resizer`);
      else navigate(`/ibps-${t}-resizer`);
    }
    else if (cat === 'rrb') navigate(`/rrb-${t}-resizer`);
    else if (cat === 'neet') navigate(`/neet-${t}-resizer`);
    else if (cat === 'acpc') navigate(`/acpc-${t}-resizer`);
    else navigate('/');
  };

  const availablePresets = getPresetsByCategory(category);
  const activePresetBase = availablePresets.find(p => p.type === type) || availablePresets[0];

  const activePreset: Preset = category === 'custom' 
    ? { ...activePresetBase, width: customWidth, height: customHeight, maxKB: customMaxKB }
    : activePresetBase;

  const availableTypes = availablePresets.map(p => ({
    type: p.type,
    label: p.type === 'photo' ? 'Photo' : p.type === 'signature' ? 'Signature' : p.type === 'thumb' ? 'Thumb Impression' : p.type === 'handwritten' ? 'Declaration' : p.type === 'postcard' ? 'Postcard Photo' : 'Custom'
  }));

  const {
    sourceImage, sourceObjectURL, loadImage, clearImage, processImage,
    isProcessing, error, crop, setCrop, zoom, setZoom, onCropComplete,
    downloadObjectURL, sourceSizeKB, finalSizeKB
  } = useImageProcessor(activePreset);

  useEffect(() => {
    if (sourceImage && category === 'custom') {
      setCustomWidth(sourceImage.naturalWidth || sourceImage.width);
      setCustomHeight(sourceImage.naturalHeight || sourceImage.height);
    }
  }, [sourceImage, category]);

  if (location.pathname === '/') {
    return <LandingPage />;
  }

  return (
    <div className="home-container">
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', marginBottom: '1.5rem', display: 'flex' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'var(--transition)', padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--surface-solid)', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}>
           <HomeIcon size={18} /> Back to All Tools
        </Link>
      </div>
      <div className="hero-section">
        <h1>{activePreset?.buttonText || "Resize Image"}</h1>
        <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600 }}>
          <ShieldCheck size={16} />
          <span>100% Secure. Images never leave your device.</span>
        </div>
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
        </div>

        <div className="main-content">
          {!sourceImage ? (
            <Dropzone onImageLoad={loadImage} isProcessing={isProcessing} />
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
            Whether you are applying for SSC exams, UPSC civil services, IBPS bank exams, NEET, or updating your PAN Card and Parivahan documents, strict image size restrictions apply. 
            Resizer India is a 100% free, fully secure, client-side browser-based tool. Your images never leave your device. It effortlessly crops your photos to exact pixel dimensions and aggressively compresses them to hit 10KB, 20KB, or 50KB limits 
            without losing visual quality. Perfect for signature uploads, left thumb impressions, handwritten declarations, and passport size photo making.
          </p>
        </div>
      )}
    </div>
  );
};
