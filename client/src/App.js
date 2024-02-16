// import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import About from './About';
import './index';
import ReactGA from 'react-ga';
const { useLocation } = require('react-router-dom');



ReactGA.initialize(process.env.TRACKING_ID);


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
  const [showMessageAlert, setShowMessageAlert] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);


  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  

  const handleGenerateCompletion = async () => {
    try {
      if (!message) {
        setShowMessageAlert(true);
        return;
      }
      const response = await fetch('http://localhost:3000/generate-loci', {
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

  const handleGenerateImage = async () => {
    try {
    
      const response = await fetch('http://localhost:3000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completion }), 
      });

      if (!response.ok) {
        throw new Error('Error generating image');
      }


      const imageData = await response.json();
      setGeneratedImage(imageData.image);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // e.preventDefault(); // Prevents the default behavior (form submission)
      handleGenerateCompletion();
    }
  };
  
  return (
    <div className={`container ${isVisible ? 'active' : ''}`}>
      <main>
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
        <input required 
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me what do you want to memorize"
          className='memorize-input'
        />
        {showMessageAlert && (
          <div className='alert-message'>Please enter what you want to memorize!</div>
          )}
      </div>
      
      {/* <div className='placeWarning'>
      <p>Place will be selected randomly if you dont enter anything</p>
    </div> */}

      <div className='container-place'>

        <label htmlFor="place" className="place-label">
        Enter A Place: 
      </label>
      
        
        <input
        type="text-place"
        id="place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="E.g.Home,Kitchen, etc."
        onKeyDown={handleKeyDown}
        className='place-input'
      />

      </div>
      <div className='placeWarning'>
      <p>Place will be selected randomly if you dont enter a place</p>
      </div>
      <div>
        <button onClick={handleGenerateCompletion}>Generate Loci</button>
        {/* {completion && (
          <button onClick={handleGenerateImage}>Generate The Image</button>
        )} */}
      </div>
      {completion && (
        <div className="result">
          <h2>Here you go:</h2>
          <p>{completion}</p>
          {completion && (
            <div>
              <button onClick={handleGenerateImage}>Generate The Image</button>
            </div>
        )}
        </div>
      )}
      {generatedImage && (
        <div className="generated-image">
          {/* make h2 appear after image generated */}
          <h2>Ta-da! Your masterpiece awaits:</h2> 
          <img src={generatedImage} alt="Generated Image" />
        </div>
      )}
      </main>
  {/* <div className='footer_second'> */}
  {/* </div> */}
    </div>
    
    );
  };
  
  export default App;