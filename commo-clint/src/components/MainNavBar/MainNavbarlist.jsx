import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './MainNavbarlist.module.scss'; // SCSS module import

const NavbarScreen = () => {
  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${styles.navbar}`}>
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="https://cdn.vectorstock.com/i/500p/69/77/logo-c-monogram-modern-letter-mockup-elegant-vector-5246977.jpg"
            alt="Logo"
            className={styles.logoImage}
          />
          <span className={`ms-2 ${styles.brandText}`}>COMMO</span>
        </a>

        {/* Toggle Button for Mobile */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex align-items-center">
    <li className="nav-item">
      <a className={`nav-link ${styles.animatedNavLink}`} href="/services">
        WhatsApp Marketing
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${styles.animatedNavLink}`} href="/pricing">
        Email Marketing
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${styles.animatedNavLink}`} href="/blog">
        Cold Calling Marketing
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${styles.animatedNavLink}`} href="/about">
        SMS Marketing
      </a>
    </li>
  </ul>

  {/* CTA Button with Advanced Animation */}
  <div className="d-flex align-items-center">
    <button className={`btn ${styles.animatedCtaButton}`} type="button">
      7 Days Free Trial
    </button>
  </div>
</div>

      </div>
    </nav>
  );
};

export default NavbarScreen;
