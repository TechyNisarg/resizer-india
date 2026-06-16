import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, DownloadCloud, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';

export const PdfCompressor: React.FC = () => {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceSizeKB, setSourceSizeKB] = useState(0);
  const [downloadObjectURL, setDownloadObjectURL] = useState<string>('');
  const [finalSizeKB, setFinalSizeKB] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [targetMaxKB, setTargetMaxKB] = useState<100 | 200 | 300>(300);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    setError('');
    setDownloadObjectURL('');
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image (JPG/PNG/WEBP).');
      return;
    }
    setSourceFile(file);
    setSourceSizeKB(file.size / 1024);
  };

  const clearFile = () => {
    setSourceFile(null);
    setSourceSizeKB(0);
    setDownloadObjectURL('');
    setFinalSizeKB(0);
    setError('');
  };

  const renderImageToCanvas = async (file: File): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          resolve(canvas);
        } else {
          reject(new Error("Canvas context error"));
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  };

  const processFile = async () => {
    if (!sourceFile) return;
    setIsProcessing(true);
    setError('');
    setDownloadObjectURL('');

    try {
      // Lazily import jspdf to keep it out of the main bundle
      const { jsPDF } = await import('jspdf');

      const canvas = await renderImageToCanvas(sourceFile);

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const orientation = imgWidth > imgHeight ? 'l' : 'p';
      
      let minQ = 0.01;
      let maxQ = 1.0;
      let quality = 0.8;
      let bestPdfBlob: Blob | null = null;
      let bestPdfSize = 0;

      for (let i = 0; i < 8; i++) {
        const doc = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [imgWidth, imgHeight],
          compress: true
        });

        const imgData = canvas.toDataURL('image/jpeg', quality);
        doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        const blob = doc.output('blob');
        const sizeKB = blob.size / 1024;

        if (sizeKB <= targetMaxKB) {
          bestPdfBlob = blob;
          bestPdfSize = sizeKB;
          minQ = quality;
          quality = (minQ + maxQ) / 2;
        } else {
          maxQ = quality;
          quality = (minQ + maxQ) / 2;
        }
      }

      if (bestPdfBlob) {
        const url = URL.createObjectURL(bestPdfBlob);
        setDownloadObjectURL(url);
        setFinalSizeKB(bestPdfSize);
      } else {
        setError('Could not compress the file enough to meet the target KB. Please try a higher limit.');
      }
    } catch (e: any) {
      console.error(e);
      setError('Error processing file: ' + (e.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <header className="header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <FileText size={32} /> Document to PDF Converter
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Convert scanned images to strict KB limit PDFs for government portals.</p>
        <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <strong>Note:</strong> Supports single-page documents. For multi-page PDFs, upload each page separately.
        </div>
      </header>

      <main className="main-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '640px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          {!sourceFile ? (
            <div 
              className="dropzone"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <Upload size={48} className="upload-icon" />
              <p style={{ marginTop: '1rem', fontWeight: 600 }}>Tap to Upload or Drop Image Here</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Supports JPG, PNG, WEBP
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>
                <ShieldCheck size={18} />
                <span>100% Secure & Private</span>
              </div>
            </div>
          ) : (
            <div className="controls">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '12px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FileText size={32} color="var(--primary)" />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{sourceFile.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{sourceSizeKB.toFixed(1)} KB</p>
                  </div>
                </div>
                <button className="btn-danger" onClick={clearFile} style={{ padding: '0.5rem 1rem', width: 'auto' }}>
                  <Trash2 size={16} /> Clear
                </button>
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Target Maximum File Size</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[100, 200, 300].map((size) => (
                    <button
                      key={size}
                      className="pill-btn"
                      onClick={() => setTargetMaxKB(size as 100 | 200 | 300)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: targetMaxKB === size ? 'var(--primary)' : 'var(--surface)',
                        color: targetMaxKB === size ? 'white' : 'var(--text-primary)',
                        border: `1px solid ${targetMaxKB === size ? 'var(--primary)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Under {size} KB
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', marginBottom: '1rem' }}>
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                className={`btn-primary ${isProcessing ? 'processing' : ''}`}
                onClick={processFile}
                disabled={isProcessing}
                style={{ width: '100%' }}
              >
                <FileText size={24} />
                <span>{isProcessing ? 'Converting to PDF...' : 'Convert to PDF'}</span>
              </button>

              {downloadObjectURL && (
                <div className="result-card" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--surface-solid)', borderRadius: '12px' }}>
                  <div className="success-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, marginBottom: '1rem' }}>
                    <ShieldCheck size={20} />
                    <span>Success!</span>
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>PDF Ready</h3>
                  
                  <div className="size-comparison" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="size-box" style={{ flex: 1, padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px', textAlign: 'center' }}>
                      <span className="size-label" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Original Image</span>
                      <span className="size-value" style={{ fontWeight: 600 }}>{sourceSizeKB.toFixed(1)} KB</span>
                    </div>
                    <div className="size-box highlight" style={{ flex: 1, padding: '1rem', backgroundColor: 'rgba(59,130,246,0.05)', border: '1px solid var(--primary)', borderRadius: '8px', textAlign: 'center' }}>
                      <span className="size-label" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Final PDF Size</span>
                      <span className="size-value" style={{ fontWeight: 600, color: finalSizeKB > targetMaxKB ? 'var(--danger)' : 'var(--success)' }}>
                        {finalSizeKB.toFixed(1)} KB
                      </span>
                    </div>
                  </div>

                  <a 
                    href={downloadObjectURL} 
                    download="document.pdf"
                    className="btn-success"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      textDecoration: 'none',
                      backgroundColor: 'var(--success)',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  >
                    <DownloadCloud size={24} />
                    Download document.pdf
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
