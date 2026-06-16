import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Scissors, Info, Shield, FileText, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

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
import { Home } from './pages/Home';
import { About, Privacy, Terms, Contact } from './pages/StaticPages';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <header className="header">
          <div className="header-container">
            <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scissors size={24} />
              <div style={{ position: 'relative', top: '-1px' }}><span className="logo-text">Resizer</span> India</div>
            </Link>
            <nav className="nav-menu" style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontSize: '0.9rem', fontWeight: 500 }}>
                <ShieldCheck size={18} />
                <span className="hide-on-mobile" style={{ position: 'relative', top: '-1px' }}>100% Client-Side. No Server Uploads.</span>
              </div>
            </nav>
          </div>
        </header>

        <main className="main-container">
          <GlobalBackButton />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
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
