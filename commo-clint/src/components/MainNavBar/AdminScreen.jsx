import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminScreen = () => {
  // State to store email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#E3EFFF',padding:20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h4 className="text-center">Admin Login</h4>
        <Form >
          <div className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" style={{backgroundColor:'#032D60',width:"50%",}} onClick={() => navigate("/AdminData")}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminScreen;
