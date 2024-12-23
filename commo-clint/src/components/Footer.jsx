import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#2466c1', color: 'white' }}>
      {/* Centered Logo Image */}
      <img
        src="https://img.freepik.com/premium-vector/logo-company-called-company-name_447549-678.jpg?w=740"
        alt="Company Logo"
        style={{
          width: 100,
          height: 100,
          display: 'block',
          margin: '0 auto',
          borderRadius: '50%',
          border: '3px solid white',
        }}
      />

      {/* Menu Items Centered with Equal Spacing */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px',gap:60,paddingTop:30 }}>
        <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>WhatsApp</p>
        <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>Email</p>
        <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>ColdCalling</p>
        <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>SMS</p>
        <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>Contact</p>
      </div>

      {/* Copyright Text */}
      <p className="contentright" style={{ marginTop: '30px', fontSize: '14px', color: '#bdc3c7', }}>
        © {currentYear} TRISHOKA. All Rights Reserved.
      </p>

      {/* Social Media Icons */}
      <div className="social_box" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
        {/* Facebook Icon */}
        <a 
          href="https://www.facebook.com/Trishoka/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <i 
            className="fab fa-facebook-f" 
            style={{
              color: '#e4405f',
              backgroundColor: 'white',
              fontSize: '30px',
              padding: '10px',
              borderRadius: '50%',
            }}
          ></i>
        </a>

        {/* Instagram Icon */}
        <a 
          href="https://www.instagram.com/trishoka_digital_services/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <i 
            className="fab fa-instagram" 
            style={{
              color: '#e4405f',
              backgroundColor: 'white',
              fontSize: '30px',
              padding: '10px',
              borderRadius: '50%',
            }}
          ></i>
        </a>

        {/* LinkedIn Icon */}
        <a 
          href="https://www.linkedin.com/company/96662799/admin/dashboard/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <i 
            className="fab fa-linkedin-in" 
            style={{
              color: '#e4405f',
              backgroundColor: 'white',
              fontSize: '30px',
              padding: '10px',
              borderRadius: '50%',
            }}
          ></i>
        </a>

        {/* Twitter Icon */}
        <a 
          href="https://x.com/TrishokaDigital" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <i 
            className="fab fa-twitter" 
            style={{
              color: '#e4405f',
              backgroundColor: 'white',
              fontSize: '30px',
              padding: '10px',
              borderRadius: '50%',
            }}
          ></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
