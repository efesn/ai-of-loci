import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import About from './About';
import './index';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
  return <div></div>;  
};

const FAQ = () => {
  return <div></div>;
};

const App = () => {
  const [message, setMessage] = useState('');
  const [completion, setCompletion] = useState('');

  const handleGenerateCompletion = async () => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
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
    <Router>
      <div className="container">
        <img src={logo} alt="AI Logo" className="logo"/>
        <h1>AI Of Loci</h1>

        <Navigation />

        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Switch>

        <div className='container2'>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what do you want to memorize"
          />
        </div>
        <div>
          <button onClick={handleGenerateCompletion}>Generate Loci</button>
        </div>
        {completion && (
          <div className="result">
            <h2>Here you go:</h2>
            {/* Adjust property name according to the backend response */}
            <p>{completion}</p>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
