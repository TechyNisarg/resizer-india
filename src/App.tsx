import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Scissors, Home as HomeIcon, Info, Shield, FileText, Mail, ShieldCheck } from 'lucide-react';
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontSize: '0.9rem', fontWeight: 500, marginRight: '1rem' }}>
                <ShieldCheck size={18} />
                <span className="hide-on-mobile" style={{ position: 'relative', top: '-1px' }}>100% Client-Side. No Server Uploads.</span>
              </div>
              <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><HomeIcon size={18} /> <span style={{ position: 'relative', top: '-1px' }}>Home</span></Link>
            </nav>
          </div>
        </header>

        <main className="main-container">
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
