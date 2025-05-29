import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App'; // Adjust the path as needed
const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from AuthContext

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const newValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: newValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGoogleClick = () => {
    console.log('Google login');
    window.location.href = '/google-login';
  };

  const handleFacebookClick = () => {
    console.log('Facebook login');
    window.location.href = '/facebook-login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.firstName) validationErrors.firstName = 'First name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Valid email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) validationErrors.phone = 'Phone number must be 10 digits';

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/authentication`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });

        console.log('User registered:', response.data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert('Registration Successful! You are now logged in.');
          navigate(redirectPath); // Redirect to intended path
        } else {
          alert('Registration Successful! Please log in.');
          navigate('/LoginScreen');
        }
      } catch (error) {
        console.error('Error registering user:', error.response?.data?.error || error.message);
        alert(error.response?.data?.error || 'Registration failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };


  // If the user is already logged in, display a message
  if (isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#FFF8EF', padding: 20 }}>
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

  // If the user is not logged in, show the registration form

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
        <h5 className="text-center">Start Your Free Trial</h5>
        <p className="text-center">Get started with a demo account</p>

        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-outline-dark mx-2 border-rounded" onClick={handleGoogleClick}>
            <FaGoogle className="me-2" style={{ color: '#DB4437' }} /> Google
          </button>
          <button className="btn btn-outline-dark mx-2" onClick={handleFacebookClick}>
            <FaFacebook className="me-2" style={{ color: 'blue' }} /> Facebook
          </button>
        </div>

        <div className="d-flex justify-content-center mb-3 position-relative">
          <div style={{ width: '45%', height: '1px', backgroundColor: '#ddd' }} />
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
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                </div>
              </div>
            </div>

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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                pattern="\d{10}"
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#032D60', color: 'white' }}
            >
              Start Your Trial
            </button>
          </form>

          <div className="text-center mt-3">
            <span>
              Already have an account?{' '}
              <button className="btn btn-link" style={{ color: 'green' }} onClick={() => navigate('/LoginScreen')}>
                Sign in
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RegisterScreen;