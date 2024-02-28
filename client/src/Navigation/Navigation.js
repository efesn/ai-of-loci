import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import axios from 'axios'; // Import axios for making API requests
import '../App.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setUsername(''); // Clear username
  };

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
        {username ? (
          <>
            <li>Welcome, {username}!</li>
            <li><button onClick={handleLogout} className='logout-button'>Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" onClick={closeMenu} className="login-button">Login</NavLink></li>
            <li><NavLink to="/register" onClick={closeMenu} className="signup-button">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
