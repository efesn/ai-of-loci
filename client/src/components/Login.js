import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    // Apply the class to the body element when the component mounts
    document.body.classList.add('register-page-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('register-page-body');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      console.log(response.data.token); // Assuming server responds with a JWT token
      // Save token to local storage or cookie
      // Redirect to home screen after successful login
      history('/');
    } catch (error) {
      console.error('Error logging in user:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className='welcome'>Sign in!</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button className='login-button' type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
