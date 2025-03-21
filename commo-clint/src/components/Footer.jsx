// import React from "react";
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#2466c1', color: 'white' }}>
//       {/* Centered Logo Image */}
//       <img
//         src="https://img.freepik.com/premium-vector/logo-company-called-company-name_447549-678.jpg?w=740"
//         alt="Company Logo"
//         style={{
//           width: 100,
//           height: 100,
//           display: 'block',
//           margin: '0 auto',
//           borderRadius: '50%',
//           border: '3px solid white',
//         }}
//       />

//       {/* Menu Items Centered with Equal Spacing */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px',gap:60,paddingTop:30 }}>
//         <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>WhatsApp</p>
//         <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>Email</p>
//         <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>ColdCalling</p>
//         <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>SMS</p>
//         <p style={{ margin: '0', fontSize: '16px', color: '#ecf0f1' }}>Contact</p>
//       </div>

//       {/* Copyright Text */}
//       <p className="contentright" style={{ marginTop: '30px', fontSize: '14px', color: '#bdc3c7', }}>
//         © {currentYear} TRISHOKA. All Rights Reserved.
//       </p>

//       {/* Social Media Icons */}
//       <div className="social_box" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
//         {/* Facebook Icon */}
//         <a 
//           href="https://www.facebook.com/Trishoka/" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           style={{ textDecoration: 'none' }}
//         >
//           <i 
//             className="fab fa-facebook-f" 
//             style={{
//               color: '#e4405f',
//               backgroundColor: 'white',
//               fontSize: '30px',
//               padding: '10px',
//               borderRadius: '50%',
//             }}
//           ></i>
//         </a>

//         {/* Instagram Icon */}
//         <a 
//           href="https://www.instagram.com/trishoka_digital_services/" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           style={{ textDecoration: 'none' }}
//         >
//           <i 
//             className="fab fa-instagram" 
//             style={{
//               color: '#e4405f',
//               backgroundColor: 'white',
//               fontSize: '30px',
//               padding: '10px',
//               borderRadius: '50%',
//             }}
//           ></i>
//         </a>

//         {/* LinkedIn Icon */}
//         <a 
//           href="https://www.linkedin.com/company/96662799/admin/dashboard/" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           style={{ textDecoration: 'none' }}
//         >
//           <i 
//             className="fab fa-linkedin-in" 
//             style={{
//               color: '#e4405f',
//               backgroundColor: 'white',
//               fontSize: '30px',
//               padding: '10px',
//               borderRadius: '50%',
//             }}
//           ></i>
//         </a>

//         {/* Twitter Icon */}
//         <a 
//           href="https://x.com/TrishokaDigital" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           style={{ textDecoration: 'none' }}
//         >
//           <i 
//             className="fab fa-twitter" 
//             style={{
//               color: '#e4405f',
//               backgroundColor: 'white',
//               fontSize: '30px',
//               padding: '10px',
//               borderRadius: '50%',
//             }}
//           ></i>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Footer;



import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Email sent successfully!");
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container-fluid text-white text-center py-3" style={{ backgroundColor: '#455da1' }}>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-3">
        <h1 className="fw-bold text-primary me-md-3 mb-3 mb-md-0">COMMO</h1>
        <form className="d-flex" onSubmit={handleSubmit} style={{ width: '50%' }}>
          <input 
            type="email" 
            className="form-control me-2" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      {message && <p className="text-success">{message}</p>}

      <div className="row text-center my-3">
        <div className="col-md-3 mb-3">
          <h2 className="fw-bold">Digital Marketing</h2>
          <p>We provide top-notch digital marketing services to enhance your brand visibility and engagement.</p>
        </div>
        <div className="col-md-3 mb-3">
          <h3 className="fw-bold">Our Services</h3>
          <p>Our services include SEO, social media marketing, web development, and branding solutions tailored to your business needs.</p>
        </div>
        <div className="col-md-3 mb-3">
          <h3 className="fw-bold">Contact Us</h3>
          <p>Have questions? Reach out to us via email, phone, or visit our office. We’re here to assist you in achieving your business goals.</p>
        </div>
        <div className="col-md-3 mb-3">
        <div className="mt-4">
        <h3 className="fw-bold">Follow Us On</h3>
        <div className="d-flex justify-content-center gap-4 mt-2">
          <a href="#" className="text-white fs-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1877f2' }}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-white fs-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#E4405F' }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white fs-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0077b5' }}>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-white fs-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1DA1F2' }}>
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
      </div>
      
      </div>
   
      <div className="text-center mt-3">
        <img src={require("../assets/images/footerimage.png")} alt="Footer Logo" className="img-fluid w-100" style={{ maxHeight: '120px', objectFit: 'cover' }} />
      </div>
      {/* <p className="mt-2">© {currentYear} COMMO. All Rights Reserved.</p> */}
    </div>
  );
};

export default Footer;



