import React, { useState } from 'react';
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
      </ul>
    </nav>
  );
};

export default Navigation;
