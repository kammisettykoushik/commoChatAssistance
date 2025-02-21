import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        location: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully", formData);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 bg-white shadow rounded" style={{ width: "450px" }}>
                <h2 className="mb-4 text-center">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} />
                                {errors.username && <small className="text-danger">{errors.username}</small>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLocation">
                                <Form.Label>Location (Optional)</Form.Label>
                                <Form.Control type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
                                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" className="w-100" style={{backgroundColor:'#151b4a'}}>Register</Button>
                </Form>
                <p className="mt-3 text-center">
                    Already registered? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/LoginScreen")}>Click to login</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;
