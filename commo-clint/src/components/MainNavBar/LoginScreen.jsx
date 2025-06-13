import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

import axios from 'axios';
import { AuthContext } from '../../App'; // Adjust path

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Access isLoggedIn and setIsLoggedIn

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGoogleClick = () => {
    console.log('Google login');
    window.location.href = `${process.env.REACT_APP_API_URL}/api/authentication/google`;
  };

  const handleFacebookClick = () => {
    console.log('Facebook login');
      window.location.href = `${process.env.REACT_APP_API_URL}/api/authentication/authentication/facebook`;
  };
  useEffect(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const provider = queryParams.get('provider');
  if (token) {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/');
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Valid email is required';
    if (!formData.password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/authentication/login`, {
          email: formData.email,
          password: formData.password,
        });

        console.log('Login successful:', response.data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true); // Explicitly update isLoggedIn
          alert('Login successful!');
          navigate(redirectPath);
        } else {
          throw new Error('No token received from server');
        }
      } catch (error) {
        console.error('Error logging in:', error.response?.data?.error || error.message);
        alert(error.response?.data?.error || 'Login failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#FFF8EF', padding: 5 }}>
        <div
          style={{
            backgroundColor: 'white',
            border: '2px solid green',
            padding: '20px',
            width: '40%',
            margin: 'auto',
            marginBottom: 20,
            marginTop: 20,
            borderRadius: 20,
          }}
        >
          <h5 className="text-center">You are already logged in</h5>
          <p className="text-center">You can navigate to other pages using the menu.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8EF', padding: 5 }}>
      <div
        style={{
          backgroundColor: 'white',
          border: '2px solid green',
          padding: '20px',
          width: '40%',
          margin: 'auto',
          marginBottom: 20,
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        <h5 className="text-center">Login to Your Account</h5>
        <p className="text-center">Welcome back! Please log in to continue.</p>

        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-outline-dark mx-2 border-rounded" onClick={handleGoogleClick}>
            <FaGoogle className="me-2" style={{ color: '#DB4437' }} /> Google
          </button>
          <button className="btn btn-outline-dark mx-2" onClick={handleFacebookClick}>
            <FaFacebook className="me-2" style={{ color: 'blue' }} /> Facebook
          </button>
        </div>

        <div className="d-flex justify-content-center mb-3 position-relative">
          <div style={{ width: '70%', height: '1px', backgroundColor: '#ddd' }} />
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              backgroundColor: 'white',
              padding: '0 10px',
              fontWeight: 'bold',
            }}
          >
            Continue with Email
          </span>
        </div>

        <div className="col-md-12 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="form-check-input"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember Me
                </label>
              </div>
              <Link style={{ textDecoration: 'none', color: 'green' }} onClick={() => navigate('/ForgotScreen')}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: '#032D60', color: 'white' }}>
              Log In
            </button>
          </form>

          <div className="text-center mt-3">
            <span>
              Don't have an account?{' '}
              <button className="btn btn-link" style={{ color: 'green' }} onClick={() => navigate('/RegisterScreen')}>
                Sign Up
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginScreen;
