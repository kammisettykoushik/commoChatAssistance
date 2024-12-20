import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavbarScreen = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'whitesmoke' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <p
            style={{
              backgroundColor: '#074799', color: 'white', borderRadius: 5, fontSize: 15, padding: '10px 20px',
              width: 'auto', marginTop: 10
            }}
          >
            COMMO
          </p>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: '#212121' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-evenly align-items-center w-100">
            <li className="nav-item">
              <a className="nav-link" href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" style={{ color: '#074799' }}>
                WhatsApp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:your.email@example.com" style={{ color: '#074799' }}>
                Email
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="tel:+yourphonenumber" style={{ color: '#074799' }}>
                Cold Calling
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="sms:+yourphonenumber" style={{ color: '#074799' }}>
                SMS
              </a>
            </li>
            <div className="navbar-text ms-4">
              <span style={{ color: '#FF6347', fontWeight: 'bold' }}>7 Days Free Trial</span>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarScreen;
