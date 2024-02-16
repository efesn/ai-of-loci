import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import '../App.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <nav>
      {/* Conditionally render the Hamburger component based on screen size */}
      <div className="menu-icon">
        <Hamburger toggled={menuOpen} toggle={toggleMenu} />
      </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink></li>
        <li><NavLink to="/login" onClick={closeMenu} className="login-button">Login</NavLink></li>
        <li><NavLink to="/register" onClick={closeMenu} className="signup-button">Sign Up</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;
