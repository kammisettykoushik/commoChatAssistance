// import React, { useState } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const RegisterScreen = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         location: "",
//         password: "",
//         confirmPassword: ""
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         if (!formData.username.trim()) newErrors.username = "Username is required";
//         if (!formData.email.trim()) newErrors.email = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
//         if (!formData.password.trim()) newErrors.password = "Password is required";
//         else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//         if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
//         else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             console.log("Form submitted successfully", formData);
//         }
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center vh-100">
//             <div className="p-4 bg-white shadow rounded" style={{ width: "450px" }}>
//                 <h2 className="mb-4 text-center">Register</h2>
//                 <Form onSubmit={handleSubmit}>
//                     <Row>
//                         <Col md={6}>
//                             <Form.Group className="mb-3" controlId="formUsername">
//                                 <Form.Label>Username</Form.Label>
//                                 <Form.Control type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} />
//                                 {errors.username && <small className="text-danger">{errors.username}</small>}
//                             </Form.Group>
//                         </Col>
//                         <Col md={6}>
//                             <Form.Group className="mb-3" controlId="formEmail">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
//                                 {errors.email && <small className="text-danger">{errors.email}</small>}
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={6}>
//                             <Form.Group className="mb-3" controlId="formLocation">
//                                 <Form.Label>Location (Optional)</Form.Label>
//                                 <Form.Control type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} />
//                             </Form.Group>
//                         </Col>
//                         <Col md={6}>
//                             <Form.Group className="mb-3" controlId="formPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
//                                 {errors.password && <small className="text-danger">{errors.password}</small>}
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={12}>
//                             <Form.Group className="mb-3" controlId="formConfirmPassword">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
//                                 {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                     <Button type="submit" className="w-100" style={{backgroundColor:'#151b4a'}}>Register</Button>
//                 </Form>
//                 <p className="mt-3 text-center">
//                     Already registered? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/LoginScreen")}>Click to login</span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default RegisterScreen;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleGoogleClick = () => {

        console.log('Google login');
        window.location.href = '/google-login';
    };

    const handleFacebookClick = () => {

        console.log('Facebook login');
        window.location.href = '/facebook-login';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};


        if (!formData.firstName) validationErrors.firstName = 'First name is required';
        if (!formData.lastName) validationErrors.lastName = 'Last name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Valid email is required';
        if (!formData.password) validationErrors.password = 'Password is required';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) validationErrors.phone = 'Phone number must be 10 digits';

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted successfully');
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
                    borderRadius: 20
                }}
            >
                <h5 className="text-center">Start Your Free Trial</h5>
                <p className="text-center">Get started with a demo account</p>

                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-outline-dark mx-2 border-rounded" onClick={handleGoogleClick}>
                        <FaGoogle className="me-2" style={{ color: ' #DB4437' }} /> Google
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
                            <label htmlFor="Confirmpassword" className="form-label">Confirm Password</label>
                            <input
                                type="Confirmpassword"
                                id="Confirmpassword"
                                name="Confirmpassword"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-danger">{errors.Confirmpassword}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                            />
                            {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        </div>

                        <button type="submit" className="btn w-100" style={{ backgroundColor: '#032D60', color: 'white' }}>Start Your Trial</button>
                    </form>

                    <div className="text-center mt-3">
                        <span>Already have an account? <button className="btn btn-link" style={{ color: 'green' }} onClick={() => navigate("/LoginScreen")}>Sign in</button></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;





