import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, User, Menu } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem 1rem 1rem' }}>
        <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          Resize Images Perfectly for <br className="hide-on-mobile" /><span style={{ color: 'var(--primary)' }}>Indian Exams & Portals</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={18} /> Upload File</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Upload your photo, signature, thumb impression, or document. Don't worry, your files never leave your device. Everything runs securely inside your web browser.</p>
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
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>My Story</h2>
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <User size={150} />
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>
            "I was going to apply for my driving licence and at the bottom of the application it said the document should be strictly between 10 to 20 KB. I searched on the web and there are many tools available but I came to know that they save our personal data and images on their servers.
            <br /><br />
            I decided to build my own personal tool to protect my privacy. I built a photo and signature resizer for an RTO. But then more ideas came, I kept building, and today I am here with a very useful website for everyone, absolutely free and 100% secure. Your images never leave your device!"
          </p>
        </div>
      </div>

    </div>
  );
};
