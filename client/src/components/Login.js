import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png';


const Login = ( {setUsername  } ) => {
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
    document.body.classList.add('login-page-body');

    return () => {
      document.body.classList.remove('login-page-body');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the JWT token
      setErrorMessage(<p className="success-message">Success! Redirecting to home page...</p>);
      setTimeout(() => {
        history('/');
    }, 3000);

    } catch (error) {
      console.error('Error logging in user:', error);
      setErrorMessage('Invalid email or password');
    }
  };
  

  return (
    <div className="login-page">
        <img src={logo} alt="AI Of Loci Logo" className="logo" />
        <h2 className="welcome">Sign In!</h2>
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
            <p>New to AI Of Loci?<Link to="/register">Sign Up!</Link></p>
            <button className="login-button" type="submit">Login</button>
            <Link to="/" className='go-back-button-register'>Go Back</Link>
          </div>
        </form>
    </div>
  );
};

export default Login;
