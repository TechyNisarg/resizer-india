import React, { useState, useCallback } from 'react';
import { Upload, FileText, DownloadCloud, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';

// Define the worker src for pdfjs (required for Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const PdfCompressor: React.FC = () => {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceSizeKB, setSourceSizeKB] = useState(0);
  const [downloadObjectURL, setDownloadObjectURL] = useState<string>('');
  const [finalSizeKB, setFinalSizeKB] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [targetMaxKB, setTargetMaxKB] = useState(100);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    setError('');
    setDownloadObjectURL('');
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError('Please upload an image (JPG/PNG) or a PDF file.');
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

  const renderPDFPageToCanvas = async (file: File): Promise<HTMLCanvasElement> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1); // just grab first page for now
    
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext('2d');
    if (!context) throw new Error("Could not get 2D context");
    
    await page.render({ canvasContext: context, viewport } as any).promise;
    return canvas;
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
      let canvas: HTMLCanvasElement;
      
      if (sourceFile.type === 'application/pdf') {
        canvas = await renderPDFPageToCanvas(sourceFile);
      } else {
        canvas = await renderImageToCanvas(sourceFile);
      }

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
        setError('Could not compress the file enough to meet the target KB. Please increase the limit.');
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
          <FileText size={32} /> PDF & Document Compressor
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Compress PDFs or convert Images to lightweight PDFs for portals.</p>
      </header>

      <main className="main-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          {!sourceFile ? (
            <div 
              className="dropzone"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/jpeg, image/png, application/pdf"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="upload-label">
                <Upload size={48} color="var(--primary)" />
                <p style={{ marginTop: '1rem', fontWeight: 600 }}>Drop an Image or PDF here</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  Supports JPG, PNG, and PDF
                </p>
              </label>
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
                <button className="btn-danger" onClick={clearFile} style={{ padding: '0.5rem 1rem' }}>
                  <Trash2 size={16} /> Clear
                </button>
              </div>

              <div className="input-group" style={{ marginBottom: '1rem' }}>
                <label>Target Maximum File Size (KB)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    type="range" 
                    min="10" max="500" step="10" 
                    value={targetMaxKB} 
                    onChange={(e) => setTargetMaxKB(Number(e.target.value))} 
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontWeight: 600, minWidth: '60px' }}>{targetMaxKB} KB</span>
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
                <span>{isProcessing ? 'Compressing...' : 'Compress Document'}</span>
              </button>

              {downloadObjectURL && (
                <div className="result-card" style={{ marginTop: '2rem' }}>
                  <div className="success-badge" style={{ marginBottom: '1rem' }}>
                    <ShieldCheck size={20} />
                    <span>Success!</span>
                  </div>
                  <h3 style={{ marginBottom: '1rem' }}>Document Compressed</h3>
                  
                  <div className="size-comparison" style={{ marginBottom: '1.5rem' }}>
                    <div className="size-box">
                      <span className="size-label">Original</span>
                      <span className="size-value">{sourceSizeKB.toFixed(1)} KB</span>
                    </div>
                    <div className="size-box highlight">
                      <span className="size-label">Final Size</span>
                      <span className="size-value" style={{ color: finalSizeKB > targetMaxKB ? 'var(--danger)' : 'var(--success)' }}>
                        {finalSizeKB.toFixed(1)} KB
                      </span>
                    </div>
                  </div>

                  <a 
                    href={downloadObjectURL} 
                    download="compressed-document.pdf"
                    className="btn-success"
                    style={{ display: 'flex', textDecoration: 'none', justifyContent: 'center' }}
                  >
                    <DownloadCloud size={24} />
                    Download PDF
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
