import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Maximize } from 'lucide-react';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const navLinks = [
    { name: 'Driving Licence', path: '/rto-photo-resizer' },
    { name: 'PAN Card', path: '/pan-card-photo-resizer' },
    { name: 'Govt Exams', path: '/ssc-photo-resizer' },
    { name: 'Passport', path: '/passport-photo-resizer' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Maximize size={24} className="logo-icon" />
          <span className="logo-text">Resizer India</span>
        </Link>
        <nav className="nav-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`nav-link ${location.pathname.includes(link.path.split('-')[0]) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
