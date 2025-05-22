import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaSms } from 'react-icons/fa';
import Clients from '../../pages/ourclints/Client';
import Services from '../../pages/whatsappmarketing/Services';
import WhatsAppContent from '../../pages/whatsappmarketing/WhatsAppContent';
import NavBar from '../Navbar';
import Footer from '../Footer';
import { useContext } from 'react';
import { AuthContext } from '../../App'; // Adjust path based on your structure
import { Navbar } from 'react-bootstrap';

const NavbarScreen = () => {
 

  return (
    <div>
     <NavBar />
      <Clients />
      <Services />
      <WhatsAppContent />
      <Footer />
    </div>
  );
};

export default NavbarScreen;