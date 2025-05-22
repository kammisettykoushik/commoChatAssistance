import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const Footer = () => {
  const navigate = useNavigate();
const ClickToGo = () => { 
  navigate("/privacy-policy");
 }
 const ClickGo = () => {
  navigate("/TermsandConditions")
 }
 const ClicktoHelp = () => {
  navigate("/HelpCenter")
 }
 const ClicktoFAQs = () => {
  navigate("/FAQs")
}
 
  return (
    <footer style={{ backgroundColor: '#fdf6ec' }} className="">
      <hr/>
      <div className="container">
        {/* Top Row */}
        {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div style={{
            backgroundColor: '#0f3c69',
            color: 'white',
            padding: '8px 20px',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '5px'
          }}>
            Trishoka Connect
          </div>
          <form className="d-flex mt-3 mt-md-0 w-50 w-md-50">
            <input
              type="email"
              className="form-control me-2"
              placeholder="Enter your email here..."
              required
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div> */}

        {/* First Content Row: 4 Columns */}
        <div className="row text-start">
          <div className="col-md-3 ">
        
          <div style={{
            backgroundColor: '#0f3c69',
            color: 'white',
            padding: '8px 20px',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '5px',
            display: 'inline-block'
          }}>
            Trishoka Connect
          </div>
          <p className="small">Welcome to Trishoka Connect Marketing Platform!</p>
        
           
          </div>
          <div className="col-md-3 ">
            <h6 className="fw-bold">Legal & Compliance</h6>
            <ul className="list-unstyled small">
            <Link><span onClick={ClickToGo} ><li>Privacy Policy</li></span></Link>
            <Link><span onClick={ClickGo} ><li>Terms & Conditions</li></span></Link>
              <li>GDPR Compliance</li>
              <li>Do Not Call Policy</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Support & Resources</h6>
            <ul className="list-unstyled small">
            <Link><span onClick={ClicktoHelp} ><li>Help Center</li></span></Link>
            <Link><span onClick={ClicktoFAQs} ><li>FAQ's </li></span></Link>
              <li>Contact Support</li>
              <li>User Guide/Documentation</li>
            </ul>
          </div>
          <div className="col-md-3 ">
            <h6 className="fw-bold">Social Media & Branding</h6>
            <ul className="list-unstyled small">
              <li>Social Media Links</li>
              <li>Companies Logos</li>
            </ul>
          </div>
        </div>

        {/* Second Content Row: 3 Columns */}
        <div className="row text-start">
          <div className="col-md-4">
            <h6 className="fw-bold">Unsubscribe & Opt-Out Options</h6>
            <ul className="list-unstyled small">
              <li>Email/SMS Unsubscribe Links</li>
              <li>Do Not Call Registry Information for Cold Calls</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Copyrights & Credits</h6>
            <p className="small"><p className="mt-2">© {new Date().getFullYear()} Trishoka Connect. All Rights Reserved.</p></p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Follow Us On:</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

      </div>
              {/* Wave Image */}
              <div className="text-center ">
          <img
            src={require("../assets/images/footerimage.png")}
            alt="Footer Wave"
            className="img-fluid"
            style={{ width: '100%',  objectFit: 'cover' }}
          />
           {/* <p className="mt-2">© 2025 Trishoka Connect. All Rights Reserved.</p> */}
        </div>
        {/* <p className="mt-2">© {new Date().getFullYear()} Trishoka Connect. All Rights Reserved.</p> */}

    </footer>
  );
};

export default Footer;