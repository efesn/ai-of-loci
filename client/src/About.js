import React, { useState, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import './App.css'; // Import your CSS file

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []); // Trigger the fade-in effect on component mount

  return (
    <div className={`about-content ${isVisible ? 'active' : ''}`}>
      <Navigation />
      <h2>About AI Of Loci</h2>
      <p>
      {/* The method of loci is a strategy for memory enhancement, which uses visualizations of familiar spatial environments in order to enhance the recall of information. The method of loci is also known as the memory journey, memory palace, journey method, memory spaces, or mind palace technique. This method is a mnemonic device adopted in ancient Roman and Greek rhetorical treatises (in the anonymous Rhetorica ad Herennium, Cicero's De Oratore, and Quintilian's Institutio Oratoria). Many memory contest champions report using this technique to recall faces, digits, and lists of words. */}
      A digital heaven for memory enthusiasts and learners seeking a modern approach to the age-old Method of Loci. At AI Of Loci, we blend ancient wisdom with cutting-edge technology to revolutionize the way you memorize and recall information. <br /><br />

      AI Of Loci is inspired by the timeless memory palace technique, known for its efficacy in enhancing memory through spatial visualizations. With AI Of Loci, we've infused this traditional method with artificial intelligence, creating a dynamic and personalized experience tailored to your unique learning style. <br /><br />

      {/* Embark on a journey where memory meets innovation. AI Of Loci is more than just an app; it's your companion in unlocking the full potential of your memory. Explore the seamless integration of ancient techniques and modern technology – welcome to the future of memory enhancement! */}

      </p>
      {/* Add more details or sections as needed */}
    </div>
  );
};

export default About;
