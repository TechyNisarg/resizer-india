import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';

import { CATEGORIES } from '../config/tools';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const hasVisited = React.useMemo(() => {
    try {
      const visited = sessionStorage.getItem('hasVisitedLanding') === 'true';
      if (!visited) {
        sessionStorage.setItem('hasVisitedLanding', 'true');
      }
      return visited;
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="landing-page">
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem 1rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
          Resize & Compress for <span style={{ color: 'var(--primary)' }}>Indian Govt Portals</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          100% Secure, fast, and works offline in your browser. Perfect for SSC, UPSC, PAN, RTO, IBPS, and more. Hit the exact 20KB/50KB limits easily without losing image quality.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
             <ShieldCheck size={20} style={{ color: 'var(--success)' }} /> No Server Uploads
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
             <FileText size={20} style={{ color: 'var(--primary)' }} /> Accurate File Sizes
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Explore Tools</h2>
      </div>
      <motion.div 
        className="category-grid"
        initial={hasVisited ? false : "hidden"}
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
              <div className="category-action">Select Tool</div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={hasVisited ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '4rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px' }}>
            <FileText size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>PDF Tools</h2>
        </div>
        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          <motion.button 
            className="category-card" 
            onClick={() => navigate('/pdf-compressor')}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="category-icon-wrapper" style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <FileText size={32} />
            </div>
            <h2 className="category-title">PDF Compressor & Merger</h2>
            <p className="category-desc">{'• Combine images and PDFs into one optimized file.\n• Compress to strict KB limits.\n• Reorder and delete pages.\n• 100% secure client-side.'}</p>
            <div className="category-action">Select Tool</div>
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
};
