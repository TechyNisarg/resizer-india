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
            <nav className="nav-menu">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '0.4rem 0.8rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginRight: '0.5rem' }}>
                <ShieldCheck size={16} />
                <span className="hide-on-mobile">100% Client-Side. No Server Uploads.</span>
              </div>
              <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HomeIcon size={16} /> <span style={{ position: 'relative', top: '-1px' }}>Home</span></Link>
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
