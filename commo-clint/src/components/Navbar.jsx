import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaSms } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../App'; // Adjust path based on your structure
import trishokaconnectlogo from "../../src/assets/images/trishokaconnectlogo.jpg";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  const navItems = [
    { path: '/whatsappmarketing', label: 'WhatsApp', icon: <FaWhatsapp size={25} color='#074799' /> },
    { path: '/EmailMarketing', label: 'Email', icon: <FaEnvelope size={25} color='#074799' /> }, // Fixed path casing
    { path: '/coldcallingmarketing', label: 'Cold Calling', icon: <FaPhoneAlt size={20} color='#074799' /> },
    { path: '/smsMarketing', label: 'SMS', icon: <FaSms size={25} color='#074799' /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const ClickToGo = () => {
    navigate('/RegisterScreen');
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{
          backgroundColor: 'white',
          height: '60px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
            <img
              src={trishokaconnectlogo}
              alt="C-Shape"
              style={{ width: '50px', height: '50px', marginLeft: '5px' }}
            />
            {/* <Link className="navbar-brand" to="/"> */}
              <span
                className="brand-logo"
                style={{
                  color: '#074799',
                  borderRadius: 5,
                  padding: '1px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Trishoka Connect
              </span>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav mx-auto"
              style={{ justifyContent: 'center', gap: '30px' }}
            >
              {navItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.path}
                    className="nav-link"
                    style={{
                      color: '#074799',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'transform 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'red';
                      e.target.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#074799';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {item.label} {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="navbar-text ms-auto">
              {!isLoggedIn ? (
                <>
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#074799',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'red';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#074799';
                      e.target.style.color = 'white';
                    }}
                    onClick={ClickToGo}
                  >
                    7 Days Free Trial
                  </span>
                  <Link to="/LoginScreen" className="btn btn-link" style={{ color: '#074799', fontWeight: 'bold' }}>
                    Log In
                  </Link>
                </>
              ) : (
                <span
                  style={{
                    color: 'white',
                    backgroundColor: '#074799',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'red';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#074799';
                    e.target.style.color = 'white';
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;