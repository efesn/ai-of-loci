import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate password length
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log(response.data.message); // Assuming server responds with a success message
      setSignupSuccess(true);
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, display message to user, etc.
    }
  };

  useEffect(() => {
    // Apply the class to the body element when the component mounts
    document.body.classList.add('register-page-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('register-page-body');
    };
  }, []);

  useEffect(() => {
    if (signupSuccess) {
      // Redirect to home screen after successful signup
      history('/');
    }
  }, [signupSuccess, history]);

  return (
    <div className='register-page'>
      <img src={logo} alt="AI Of Loci Logo" className="logo" />
        <h2 className='join-us'>Join Us!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
            <button className='signup-button' type='submit'>Sign Up</button>
            <Link to="/" className='go-back-button-register'>Go Back</Link>
          </div>
        </form>
      </div>
  );
};

export default Register;
