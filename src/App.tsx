import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Scissors, ShieldCheck, Menu, X, ArrowLeft, HelpCircle, Info, FileText, Shield, Mail, Moon, Sun } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { CATEGORIES, PDF_TOOL } from './config/tools';

const GlobalBackButton = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;
  
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '1rem 1rem 0', display: 'flex' }}>
      <Link to="/" className="back-icon-btn" title="Back to All Tools">
         <ArrowLeft size={24} />
      </Link>
    </div>
  );
};
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { About, Privacy, Terms, Contact, FAQ } from './pages/StaticPages';
import { PdfCompressor } from './pages/PdfCompressor';
import { ImageCompressor } from './pages/ImageCompressor';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/pdf-compressor" element={<PageWrapper><PdfCompressor /></PageWrapper>} />
        <Route path="/image-compressor" element={<PageWrapper><ImageCompressor /></PageWrapper>} />
        <Route path="/*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    window.addEventListener('openSidebar', handleOpenSidebar);
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('openSidebar', handleOpenSidebar);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  // Close sidebar when location changes
  const NavLinks = () => {
    const navigate = useNavigate();
    const handleNav = (path: string) => {
      navigate(path);
      setIsSidebarOpen(false);
    };

    return (
      <>
        <div style={{ overflowY: 'auto', flexGrow: 1, paddingBottom: '2rem' }}>
          <div style={{ padding: '1rem 1.5rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</div>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => handleNav(cat.path)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <Icon size={18} style={{ color: cat.color }} /> {cat.label}
              </button>
            )
          })}
          <button onClick={() => handleNav(PDF_TOOL.path)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <PDF_TOOL.icon size={18} style={{ color: PDF_TOOL.color }} /> {PDF_TOOL.label}
          </button>
        </div>
      </>
    );
  };

  return (
    <Router>
      <Analytics />
      <div className="app-wrapper">
        <header className="header">
          <div className="header-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                className="mobile-menu-btn" 
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scissors size={24} />
                <div style={{ position: 'relative', top: '-1px' }}><span className="logo-text">Resizer</span> India</div>
              </Link>
            </div>
            <nav className="nav-menu" style={{ alignItems: 'center', display: 'flex', gap: '1.25rem' }}>
              <button 
                onClick={toggleTheme} 
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.25rem' }} 
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontSize: '0.9rem', fontWeight: 500 }}>
                <ShieldCheck size={18} />
                <span className="hide-on-mobile">100% Client-Side. No Server Uploads.</span>
              </div>
            </nav>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', backgroundColor: 'var(--bg-color)', zIndex: 1000, boxShadow: '4px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                  <Link to="/" onClick={() => setIsSidebarOpen(false)} className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <Scissors size={24} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.2rem' }}>Resizer India</span>
                  </Link>
                  <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <X size={24} />
                  </button>
                </div>
                  <NavLinks />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="main-container">
          <GlobalBackButton />
          <AppRoutes />
        </main>

        <footer className="footer hide-on-mobile-if-sidebar">
          <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
              <strong>Disclaimer:</strong> Resizer India is an independent, free utility tool designed to help users format their images. We are not affiliated with, endorsed by, or connected to any government agency, examination body, or private organization.
            </div>
            <div className="footer-links">
              <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={16} /> <span style={{ position: 'relative', top: '-1px' }}>About Us</span></Link>
              <Link to="/terms" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Terms of Service</span></Link>
              <Link to="/privacy" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Privacy Policy</span></Link>
              <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Contact</span></Link>
              <Link to="/faq" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HelpCircle size={16} /> <span>FAQs</span></Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
