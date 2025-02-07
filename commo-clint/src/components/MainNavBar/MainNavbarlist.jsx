import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaSms } from "react-icons/fa"; // Import the icons
import Clients from "../../pages/ourclints/Client";
import Services from "../../pages/whatsappmarketing/Services";
import WhatsAppContent from "../../pages/whatsappmarketing/WhatsAppContent";
import Footer from "../Footer";

const NavbarScreen = () => {
  const navItems = [
    { path: "/whatsappmarketing", label: "WhatsApp", icon: <FaWhatsapp size={25} color="#074799" /> },
    { path: "/Emailmarketing", label: "Email", icon: <FaEnvelope size={25} color="#074799" /> },
    { path: "/coldcallingmarketing", label: "Cold Calling", icon: <FaPhoneAlt size={20} color="#074799" /> },
    { path: "/smsMarketing", label: "SMS", icon: <FaSms size={25} color="#074799" /> },
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{
          backgroundColor: "white",
          height: "60px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="https://cdn.vectorstock.com/i/500p/69/77/logo-c-monogram-modern-letter-mockup-elegant-vector-5246977.jpg"
              alt="C-Shape"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <Link className="navbar-brand" to="/">
              <span
                className="brand-logo"
                style={{
                  color: "#074799",
                  borderRadius: 5,
                  padding: "10px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                COMMO
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
              style={{ justifyContent: "center", gap: "30px" }}
            >
              {navItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.path}
                    className="nav-link"
                    style={{
                      color: "#074799",
                      fontWeight: "bold",
                      fontSize: "16px",
                      transition: "transform 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "red";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#074799";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                  {item.label}  {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="navbar-text ms-auto">
              <span
                style={{
                  color: "white",
                  backgroundColor: "#074799",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "red";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#074799";
                  e.target.style.color = "white";
                }}
              >
                7 Days Free Trial
              </span>
            </div>
          </div>
        </div>
      </nav>

      <Clients />
      <Services />
      <WhatsAppContent />
      <Footer />
    </div>
  );
};

export default NavbarScreen;
