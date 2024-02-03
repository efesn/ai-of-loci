import React, { useState, useEffect } from 'react';
import Navigation from './Navigation/Navigation';

const FaqPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`faq-content ${isVisible ? 'active' : ''}`}>
      <div className="nav">
        <Navigation />
        <div>
          <h1>AI Of Loci FAQ</h1>
          <p>FAQ PAGE</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
