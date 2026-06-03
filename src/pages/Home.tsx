import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { ImagePreview } from '../components/ImagePreview';
import { Controls } from '../components/Controls';
import { PresetSelector } from '../components/PresetSelector';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { PRESETS as _P, PresetId, Preset } from '../utils/presetData';
import { PRESETS } from '../utils/presetData';

export const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getPresetFromPath = (): PresetId => {
    if (location.pathname.includes('signature')) return 'signature';
    if (location.pathname.includes('20kb')) return 'custom';
    return 'photo';
  };

  const [presetId, setPresetId] = useState<PresetId>(getPresetFromPath());
  
  // Custom Preset State
  const [customWidth, setCustomWidth] = useState(420);
  const [customHeight, setCustomHeight] = useState(525);
  const [customMaxKB, setCustomMaxKB] = useState(20);

  useEffect(() => {
    setPresetId(getPresetFromPath());
  }, [location.pathname]);

  const handlePresetSelect = (id: PresetId) => {
    setPresetId(id);
    if (id === 'signature') navigate('/rto-signature-resizer');
    else if (id === 'custom') navigate('/resize-image-to-20kb');
    else navigate('/rto-photo-resizer');
  };

  const activePreset: Preset = presetId === 'custom' 
    ? { ...PRESETS.custom, width: customWidth, height: customHeight, maxKB: customMaxKB }
    : PRESETS[presetId];

  const {
    sourceImage, canvasRef, loadImage, clearImage, rotateImage90, processImage,
    isProcessing, error, zoom, setZoom, panX, setPanX, panY, setPanY,
    downloadObjectURL, sourceSizeKB, finalSizeKB
  } = useImageProcessor(activePreset);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>{activePreset.buttonText}</h1>
        <p>100% Client-side. No images are uploaded to any server.</p>
      </div>

      <div className="workspace">
        <div className="sidebar">
          <PresetSelector currentPreset={presetId} onSelect={handlePresetSelect} />
          
          {presetId === 'custom' && (
            <div className="custom-controls">
              <label>Width (px) <input type="number" value={customWidth} onChange={e => setCustomWidth(Number(e.target.value) || 1)} /></label>
              <label>Height (px) <input type="number" value={customHeight} onChange={e => setCustomHeight(Number(e.target.value) || 1)} /></label>
              <label>Max Size (KB) <input type="number" value={customMaxKB} onChange={e => setCustomMaxKB(Number(e.target.value) || 1)} /></label>
            </div>
          )}

          {!sourceImage ? (
            <div className="instructions card">
              {presetId === 'photo' && (
                <>
                  <h2>Photo Requirements</h2>
                  <ul>
                    <li>Output size: 420 x 525 px</li>
                    <li>Final file size: 10KB to 20KB</li>
                    <li>Use a light or white background</li>
                  </ul>
                </>
              )}
              {presetId === 'signature' && (
                <>
                  <h2>Signature Requirements</h2>
                  <ul>
                    <li>Output size: 256 x 64 px</li>
                    <li>Final file size: 10KB to 20KB</li>
                    <li>Use black/blue ink on white paper</li>
                  </ul>
                </>
              )}
              {presetId === 'custom' && (
                <>
                  <h2>Custom Resize</h2>
                  <ul>
                    <li>Set exact width and height</li>
                    <li>Set maximum KB size</li>
                    <li>Useful for forms and portals</li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <Controls 
              zoom={zoom} setZoom={setZoom}
              panX={panX} setPanX={setPanX}
              panY={panY} setPanY={setPanY}
              onRotate={rotateImage90}
              onClear={clearImage}
              onProcess={processImage}
              isProcessing={isProcessing}
              buttonText={activePreset.buttonText}
            />
          )}

          {error && <div className="error-toast">{error}</div>}

          {downloadObjectURL && (
            <div className="result-card card">
              <h3>Success! 🎉</h3>
              <p>Original: <strong>{sourceSizeKB.toFixed(2)} KB</strong></p>
              <p>Compressed: <strong>{finalSizeKB.toFixed(2)} KB</strong></p>
              <a href={downloadObjectURL} download={`${activePreset.filename}-${finalSizeKB.toFixed(2)}KB.jpg`} className="btn-primary" style={{marginTop: '1rem', display: 'inline-block', textAlign: 'center', width: '100%'}}>
                Download Image
              </a>
            </div>
          )}
        </div>

        <div className="main-content">
          {!sourceImage ? (
            <Dropzone onImageLoad={loadImage} />
          ) : (
            <ImagePreview canvasRef={canvasRef} width={activePreset.width} height={activePreset.height} />
          )}
        </div>
      </div>
    </div>
  );
};
