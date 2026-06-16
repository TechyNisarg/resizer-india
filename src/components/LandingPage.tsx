import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, CreditCard, Plane, BookOpen, Sliders, Landmark, Train, Stethoscope, GraduationCap } from 'lucide-react';

const CATEGORIES = [
  { id: 'rto', label: 'RTO / Parivahan', icon: Car, color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', desc: '• Photo: 3.5x4.5 cm\n• Sign: 256x64 px\n• Size: 10KB - 20KB\n• Portals: Vahan, Sarathi', path: '/rto-photo-resizer' },
  { id: 'pan', label: 'PAN Card', icon: CreditCard, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', desc: '• Photo: 213x213 px\n• Sign: 400x200 px\n• Size: Max 50KB\n• Portals: NSDL, UTIITSL', path: '/pan-card-photo-resizer' },
  { id: 'passport', label: 'Passport Photo', icon: Plane, color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.1)', desc: '• Size: 2x2 inch (51x51mm)\n• Background: White\n• Format: JPEG\n• Uses: OCI, Passport Seva', path: '/passport-photo-resizer' },
  { id: 'ssc', label: 'SSC Exams', icon: BookOpen, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', desc: '• Photo: 3.5x4.5 cm (20-50KB)\n• Sign: 4.0x2.0 cm (10-20KB)\n• Thumb: 10-30KB\n• Strict format enforced', path: '/ssc-photo-resizer' },
  { id: 'upsc', label: 'UPSC Exams', icon: BookOpen, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', desc: '• Photo & Sign: 350x350 px (Min)\n• Max Size: 1000x1000 px\n• File Size: 20KB - 300KB\n• Bit Depth: 24-bit', path: '/upsc-photo-resizer' },
  { id: 'ibps', label: 'IBPS/SBI Exams', icon: Landmark, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', desc: '• Photo: 4.5x3.5 cm (20-50KB)\n• Sign: 140x60 px (10-20KB)\n• Thumb: 20-50KB\n• Declaration: 50-100KB', path: '/ibps-photo-resizer' },
  { id: 'rrb', label: 'Railway (RRB)', icon: Train, color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', desc: '• Photo: 35x45 mm (20-50KB)\n• Background: White only\n• Sign: 50x20 mm (10-40KB)\n• Format: JPG/JPEG', path: '/rrb-photo-resizer' },
  { id: 'neet', label: 'NEET / NTA', icon: Stethoscope, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', desc: '• Passport: 10-200KB\n• Postcard: 4x6 inch (10-200KB)\n• Sign: 4-30KB\n• Thumb: 10-200KB', path: '/neet-photo-resizer' },
  { id: 'acpc', label: 'ACPC Admission', icon: GraduationCap, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)', desc: '• Photo: 10-50KB\n• Sign: 10-50KB\n• Format: JPG/JPEG\n• Uses: GUJCET, Engineering', path: '/acpc-photo-resizer' },
  { id: 'custom', label: 'Custom Tool', icon: Sliders, color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)', desc: '• Custom Width & Height\n• Exact KB Compression\n• Ratio Preserving\n• Manual Cropping', path: '/custom-resizer' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">


      <motion.div 
        className="category-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
      >
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <motion.button 
              key={cat.id} 
              className="category-card" 
              onClick={() => navigate(cat.path)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { type: 'spring', stiffness: 300, damping: 24 } 
                }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="category-icon-wrapper" style={{ color: cat.color, backgroundColor: cat.bg }}>
                <Icon size={32} />
              </div>
              <h2 className="category-title">{cat.label}</h2>
              <p className="category-desc">{cat.desc}</p>
              <div className="category-action">Open Tool</div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div 
        className="seo-text" 
        style={{ marginTop: '4rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Why use Resizer India?</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          Whether you are applying for SSC exams, UPSC civil services, IBPS bank exams, NEET, or updating your PAN Card and Parivahan documents, strict image size restrictions apply. 
          Resizer India is a 100% free, fully secure, client-side browser-based tool. Your images never leave your device. It effortlessly crops your photos to exact pixel dimensions and aggressively compresses them to hit 10KB, 20KB, or 50KB limits 
          without losing visual quality. Perfect for signature uploads, left thumb impressions, handwritten declarations, and passport size photo making.
        </p>
      </motion.div>
    </div>
  );
};
