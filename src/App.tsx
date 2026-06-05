import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <header className="header">
          <div className="header-container">
            <div className="logo">
              <span className="logo-text">Resizer</span> India
            </div>
            <nav className="nav-menu">
              <a href="/" className="nav-link">Home</a>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Privacy</a>
            </nav>
          </div>
        </header>

        <main className="main-container">
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>100% Client-side processing. Your images never leave your device.</p>
            <div className="footer-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
