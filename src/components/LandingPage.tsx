import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CreditCard, Plane, BookOpen, Sliders, Landmark, Train, Stethoscope, GraduationCap, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { id: 'rto', label: 'RTO / Parivahan', icon: Car, desc: 'Quickly adjust photos and signatures to match exact Parivahan / RTO specifications without losing quality.', path: '/rto-photo-resizer' },
  { id: 'pan', label: 'PAN Card', icon: CreditCard, desc: 'Resize for NSDL or UTIITSL PAN card portals. 213x213px at 300DPI for photos, and 2:1 ratio for signatures.', path: '/pan-card-photo-resizer' },
  { id: 'passport', label: 'Passport Photo (2x2 inch)', icon: Plane, desc: 'Standard Indian Passport/Visa sizes (2x2 inch or 51x51mm). Perfect for online OCI or Passport Seva applications.', path: '/passport-photo-resizer' },
  { id: 'ssc', label: 'SSC Exams', icon: BookOpen, desc: 'Exact 4.5x3.5cm sizes for SSC photos, signatures, and thumb impressions. 20-50KB limits strictly enforced.', path: '/ssc-photo-resizer' },
  { id: 'upsc', label: 'UPSC Exams', icon: BookOpen, desc: 'Meet the strict UPSC 350x350px limits. Crops accurately and compresses within 20KB-300KB as required.', path: '/upsc-photo-resizer' },
  { id: 'ibps', label: 'Bank Exams (IBPS/SBI)', icon: Landmark, desc: 'Instantly resize photos, signatures, left thumb impressions, and handwritten declarations to meet strict IBPS/SBI limits.', path: '/ibps-photo-resizer' },
  { id: 'rrb', label: 'Railway Exams (RRB)', icon: Train, desc: 'Ensure your RRB application is not rejected. Perfectly crops to 35x45mm on a strict white background.', path: '/rrb-photo-resizer' },
  { id: 'neet', label: 'NEET / NTA Exams', icon: Stethoscope, desc: 'Resize NEET passport, postcard photos, and finger impressions according to the latest NTA brochure guidelines.', path: '/neet-photo-resizer' },
  { id: 'acpc', label: 'ACPC Admission', icon: GraduationCap, desc: 'Fast resize for Gujarat ACPC engineering and diploma admission portals. Prepare your photos and signatures accurately.', path: '/acpc-photo-resizer' },
  { id: 'custom', label: 'Custom Size', icon: Sliders, desc: 'Need a specific pixel width, height, or KB size? Use the custom tool to manually set your own form requirements.', path: '/custom-resizer' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <h1 className="landing-title">Select Your Form Type</h1>
        <p className="landing-subtitle">Choose the specific government application or form you are applying for to instantly load the exact official photo requirements.</p>
        <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.9rem', fontWeight: 600 }}>
          <ShieldCheck size={18} />
          <span>100% Client-Side Processing. No Server Uploads.</span>
        </div>
      </div>

      <div className="category-grid">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <button key={cat.id} className="category-card" onClick={() => navigate(cat.path)}>
              <div className="category-icon-wrapper">
                <Icon size={32} />
              </div>
              <h2 className="category-title">{cat.label}</h2>
              <p className="category-desc">{cat.desc}</p>
              <div className="category-action">Start Resizing &rarr;</div>
            </button>
          );
        })}
      </div>

      <div className="seo-text" style={{ marginTop: '4rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Why use Resizer India?</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          Whether you are applying for SSC exams, UPSC civil services, IBPS bank exams, NEET, or updating your PAN Card and Parivahan documents, strict image size restrictions apply. 
          Resizer India is a 100% free, fully secure, client-side browser-based tool. Your images never leave your device. It effortlessly crops your photos to exact pixel dimensions and aggressively compresses them to hit 10KB, 20KB, or 50KB limits 
          without losing visual quality. Perfect for signature uploads, left thumb impressions, handwritten declarations, and passport size photo making.
        </p>
      </div>
    </div>
  );
};
