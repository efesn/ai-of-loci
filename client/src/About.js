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

      AI Of Loci is a memorization and learning/studying platform powered by AI. Users can effectively learn information using advanced AI algorithms and an ancient memorization technique known as the "Method of Loci" or "Mind Palace" <br /><br />
      
      The platform assists users in learning and memorizing information by allowing them to input text (and place) related to a specific topic. Users enter detailed text about the subject they want to learn, and AI Of Loci enhances their memorization based on this input and place. For example, when a user enters a topic they want to learn about biology, the platform provides a series of mind palace content containing important concepts related to it in the place you entered. <br /><br />

      While you have the option to enter a specific place along with your text to place input, rest assured that AI will intelligently select a place for you if you prefer not to specify one. <br /><br />

      Our main goal is to transform the project into a comprehensive memorization and studying, learning platform by integrating all other popularly used methods and tools (such as flashcards, mind maps, the Pomodoro technique, interactive quizzes for reinforcing information, group study sessions, etc.) to reach more users and meet their needs and desires.

      {/* Embark on a journey where memory meets innovation. AI Of Loci is more than just an app; it's your companion in unlocking the full potential of your memory. Explore the seamless integration of ancient techniques and modern technology – welcome to the future of memory enhancement! */}

      </p>
      {/* Add more details or sections as needed */}
    </div>
  );
};

export default About;
