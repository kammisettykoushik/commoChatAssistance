import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Login successful", formData);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 bg-white shadow rounded" style={{ width: "400px" }}>
                <h2 className="mb-4 text-center">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} />
                        {errors.username && <small className="text-danger">{errors.username}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </Form.Group>
                    <Button type="submit" className="w-100" style={{backgroundColor:'#151b4a'}}>Login</Button>
                </Form>
                <p className="mt-3 text-center">
                    New user? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/register")}>Register here</span>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
