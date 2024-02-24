import React from 'react';
import githubLogo from '../githublogo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://github.com/efesn/ai-of-loci" target="_blank" rel="noopener noreferrer"> 
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" /> 
        </a>
        <p>&copy; AI Of Loci - 2024</p>
        <p className='mail'>Contact: info@aiofloci.com</p>
      </div>
    </footer>
  );
};

export default Footer;
