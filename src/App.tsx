import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { About, Privacy, Terms, Contact } from './pages/StaticPages';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <header className="header">
          <div className="header-container">
            <Link to="/" className="logo">
              <span className="logo-text">Resizer</span> India
            </Link>
            <nav className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/privacy" className="nav-link">Privacy</Link>
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
            <p>100% Client-side processing. Your images never leave your device.</p>
            <div className="footer-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
