// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const LoginScreen = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: "",
//         password: ""
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         if (!formData.username.trim()) newErrors.username = "Username is required";
//         if (!formData.password.trim()) newErrors.password = "Password is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             console.log("Login successful", formData);
//         }
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center vh-100">
//             <div className="p-4 bg-white shadow rounded" style={{ width: "400px" }}>
//                 <h2 className="mb-4 text-center">Login</h2>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3" controlId="formUsername">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} />
//                         {errors.username && <small className="text-danger">{errors.username}</small>}
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
//                         {errors.password && <small className="text-danger">{errors.password}</small>}
//                     </Form.Group>
//                     <Button type="submit" className="w-100" style={{backgroundColor:'#151b4a'}}>Login</Button>
//                 </Form>
//                 <p className="mt-3 text-center">
//                     New user? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/RegisterScreen")}>Register here</span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginScreen;




import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
 const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGoogleClick = () => {
    // Replace with actual Google login logic or navigate
    console.log('Google login');
    window.location.href = '/google-login'; // Example of navigating after Google login
  };

  const handleFacebookClick = () => {
    // Replace with actual Facebook login logic or navigate
    console.log('Facebook login');
    window.location.href = '/facebook-login'; // Example of navigating after Facebook login
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation logic for email and password
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Valid email is required';
    if (!formData.password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully');
      // Submit form here or navigate to another page
    } else {
      setErrors(validationErrors);
    }
  };

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

        {/* Social login buttons with icons */}
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-outline-dark mx-2 border-rounded" onClick={handleGoogleClick}>
            <FaGoogle className="me-2" style={{ color: '#DB4437' }} /> Google
          </button>
          <button className="btn btn-outline-dark mx-2" onClick={handleFacebookClick}>
            <FaFacebook className="me-2" style={{ color: 'blue' }} /> Facebook
          </button>
        </div>

        {/* Continue with Email section */}
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
              <a href="#!" style={{ textDecoration: 'none',color:'green' }} onClick={() => navigate("/ForgotScreen")}>Forgot Password?</a>
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: '#032D60', color: 'white' }}>
              Log In
            </button>
          </form>

          <div className="text-center mt-3">
            <span>
              Don't have an account?{' '}
              <button className="btn btn-link" style={{ color: 'green' }} onClick={() => navigate("/RegisterScreen")}>Sign Up</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

