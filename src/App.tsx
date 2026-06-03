import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About, Contact, Privacy, Terms } from './pages/StaticPages';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rto-photo-resizer" element={<Home />} />
            <Route path="/rto-signature-resizer" element={<Home />} />
            <Route path="/resize-image-to-20kb" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
