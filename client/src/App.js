import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import About from './About';
import './index';


const Home = () => {
  return <div></div>;  
};

const FAQ = () => {
  return <div></div>;
};

const App = () => {
  const [message, setMessage] = useState('');
  const [completion, setCompletion] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [place, setPlace] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);
  

  const handleGenerateCompletion = async () => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, place }),
      });
  
      if (!response.ok) {
        throw new Error('Error generating completion');
      }
  
      const result = await response.json();
      setCompletion(result.completion.content);
  
      if (result.completion) {
        // Adjust property name according to the backend response
        setCompletion(result.completion.content);
      } else {
        console.log('Invalid or empty completion in response');
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior (form submission)
      handleGenerateCompletion();
    }
  };

  return (
    <div className={`container ${isVisible ? 'active' : ''}`}>
      <img src={logo} alt="AI Logo" className="logo" />
      <h1>AI Of Loci</h1>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      <div className='container-memorize'>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me what do you want to memorize"
        />
      </div>
      <div className='container-place'>

        <label htmlFor="place" className="place-label">
        Enter A Place:
      </label>
        <input
        type="text"
        id="place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="E.g.Home,Kitchen, etc."
        className='place-input'
      />

      </div>
      <div>
        <button onClick={handleGenerateCompletion}>Generate Loci</button>
      </div>
      {completion && (
        <div className="result">
          <h2>Here you go:</h2>
          <p>{completion}</p>
        </div>
      )}
    </div>
  );
};

export default App;