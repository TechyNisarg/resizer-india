import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Scissors, Info, Shield, FileText, Mail, ArrowLeft } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

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
import { About, Privacy, Terms, Contact } from './pages/StaticPages';
import { PdfCompressor } from './pages/PdfCompressor';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
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
        <Route path="/pdf" element={<PageWrapper><PdfCompressor /></PageWrapper>} />
        <Route path="/*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Analytics />
      <div className="app-wrapper">
        <header className="header">
          <div className="header-container">
            <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scissors size={24} />
              <div style={{ position: 'relative', top: '-1px' }}><span className="logo-text">Resizer</span> India</div>
            </Link>
            <nav className="nav-menu" style={{ alignItems: 'center' }}>
            </nav>
          </div>
        </header>

        <main className="main-container">
          <GlobalBackButton />
          <AppRoutes />
        </main>

        <footer className="footer">
          <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
              <strong>Disclaimer:</strong> Resizer India is an independent, free utility tool designed to help users format their images. We are not affiliated with, endorsed by, or connected to any government agency, examination body, or private organization.
            </div>
            <div className="footer-links">
              <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={16} /> <span style={{ position: 'relative', top: '-1px' }}>About Us</span></Link>
              <Link to="/terms" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Terms of Service</span></Link>
              <Link to="/privacy" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Privacy Policy</span></Link>
              <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Contact</span></Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
