import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, User, Menu } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem 1rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
          Perfect Image Resizer for <span style={{ color: 'var(--primary)' }}>Exams & Portals</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          100% Secure, fast, and works offline in your browser. Hit the exact 20KB/50KB limits easily without losing image quality.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
             <ShieldCheck size={20} style={{ color: 'var(--success)' }} /> No Server Uploads
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
             <FileText size={20} style={{ color: 'var(--primary)' }} /> Accurate File Sizes
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ marginBottom: '4rem', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>How It Works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Menu size={18} /> Select Your Tool</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Click the menu icon in the top left corner to open the sidebar and select the specific exam or portal you are applying for (e.g. UPSC, SSC, PAN Card).</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={18} /> Upload Image</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Upload your photo or signature. Don't worry, your image never leaves your device. Everything runs securely inside your web browser.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} /> Download Resized File</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Our tool will automatically crop, resize, and compress your image to the exact KB limits and pixel dimensions required by the portal.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Why We Built This */}
      <div style={{ padding: '0 1rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>Our Story: Why We Built This</h2>
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <User size={150} />
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>
            "I was going to apply for my driving license and at the very bottom of the application it said the document should be strictly between 10 to 20 KB. I searched online and found many tools available, but I realized that they save our personal data and images on their servers.
            <br /><br />
            I decided to make my own personal tool to protect my privacy. I originally built just an RTO photo and signature resizer. But then more ideas came, I kept building, and now I am here providing this highly useful website for everyone—completely free of cost and 100% secure. Your images never leave your device!"
          </p>
        </div>
      </div>

    </div>
  );
};
