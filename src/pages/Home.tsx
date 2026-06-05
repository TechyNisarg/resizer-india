import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { ImagePreview } from '../components/ImagePreview';
import { Controls } from '../components/Controls';
import { PresetSelector } from '../components/PresetSelector';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { PresetCategory, PresetType, Preset } from '../utils/presetData';
import { getPresetsByCategory } from '../utils/presetData';

export const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Custom Preset State
  const [customWidth, setCustomWidth] = useState(420);
  const [customHeight, setCustomHeight] = useState(525);
  const [customMaxKB, setCustomMaxKB] = useState(20);

  // Deriving category and type from URL, or fallback to RTO Photo
  const getInitialState = (): { cat: PresetCategory, type: PresetType } => {
    const path = location.pathname;
    if (path.includes('pan')) return { cat: 'pan', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('ssc')) return { cat: 'ssc', type: path.includes('signature') ? 'signature' : (path.includes('thumb') ? 'thumb' : 'photo') };
    if (path.includes('upsc')) return { cat: 'upsc', type: path.includes('signature') ? 'signature' : 'photo' };
    if (path.includes('passport')) return { cat: 'passport', type: 'photo' };
    if (path.includes('20kb') || path.includes('custom')) return { cat: 'custom', type: 'custom' };
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
    // default to photo when switching category (except custom)
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
    sourceImage, sourceObjectURL, loadImage, clearImage, rotateImage90, processImage,
    isProcessing, error, crop, setCrop, zoom, setZoom, onCropComplete,
    downloadObjectURL, sourceSizeKB, finalSizeKB
  } = useImageProcessor(activePreset);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>{activePreset?.buttonText || "Resize Image"}</h1>
        <p>100% Client-side. No images are uploaded to any server.</p>
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
            <div className="custom-controls">
              <label>Width (px) <input type="number" value={customWidth} onChange={e => setCustomWidth(Number(e.target.value) || 1)} /></label>
              <label>Height (px) <input type="number" value={customHeight} onChange={e => setCustomHeight(Number(e.target.value) || 1)} /></label>
              <label>Max Size (KB) <input type="number" value={customMaxKB} onChange={e => setCustomMaxKB(Number(e.target.value) || 1)} /></label>
            </div>
          )}

          {!sourceImage ? (
            <div className="instructions card">
              <h2>Requirements</h2>
              <ul>
                {activePreset?.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ul>
            </div>
          ) : (
            <Controls 
              onRotate={rotateImage90}
              onClear={clearImage}
              onProcess={processImage}
              isProcessing={isProcessing}
              buttonText={activePreset?.buttonText || 'Resize'}
            />
          )}

          {error && <div className="error-toast">{error}</div>}

          {downloadObjectURL && (
            <div className="result-card card">
              <h3>Success! 🎉</h3>
              <p>Original: <strong>{sourceSizeKB.toFixed(2)} KB</strong></p>
              <p>Compressed: <strong>{finalSizeKB.toFixed(2)} KB</strong></p>
              <a href={downloadObjectURL} download={`${activePreset?.filename || 'resized'}-${finalSizeKB.toFixed(2)}KB.jpg`} className="btn-primary" style={{marginTop: '1rem', display: 'inline-block', textAlign: 'center', width: '100%'}}>
                Download Image
              </a>
            </div>
          )}
        </div>

        <div className="main-content">
          {!sourceImage ? (
            <Dropzone onImageLoad={loadImage} />
          ) : (
            <ImagePreview 
              imageSrc={sourceObjectURL}
              crop={crop}
              zoom={zoom}
              aspect={activePreset.width / activePreset.height}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
