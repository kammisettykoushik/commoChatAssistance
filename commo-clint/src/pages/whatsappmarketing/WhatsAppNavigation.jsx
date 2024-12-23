/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const WhatsAppNavigation = () => {
  const dropDownLinks = [
    { label: "WhatsApp Marketing", path: "/Features/WhatsAppMarketing" },
    { label: "EmailMarketing", path: "/Features/EmailMarketing" },
    { label: "ColdCalling", path: "/Features/ColdCalling" },
    { label: "SMS", path: "/Features/SMS" },
  ];
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "whitesmoke" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <p
            style={{
              backgroundColor: "#074799",
              color: "white",
              borderRadius: 5,
              fontSize: 15,
              padding: 5,
              width: "100%",
              marginTop: 15,
            }}
          >
            COMMO
          </p>
        </a>

        {/* Toggler for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "#212121" }}
          ></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Menu Items */}
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/whatsappmarketing/TeamInbox"
                style={{ color: "#074799" }}
              >
                Team Inbox
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/whatsappmarketing/Broadcast"}
                className="nav-link"
                style={{ color: "#074799" }}
              >
                Broadcast
              </Link>
            </li>

            {/* Features with Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="featuresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#074799" }}
              >
                Features
              </a>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                {dropDownLinks.map((links, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={links.path}
                        className="dropdown-item"
                        style={{ color: "#212121" }}
                      >
                        {links.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to={"/whatsappmarketing/Contacts"}
                className="nav-link"
                style={{ color: "#074799" }}
              >
                Contacts
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ border: "2px solid #074799", color: "#074799" }}
            />
            <button
              className="btn btn-outline-dark ms-2"
              type="submit"
              style={{ color: "#074799" }}
            >
              Search
            </button>
          </form>

          {/* Profile Section */}
          <div className="dropdown">
            <a
              href="/profile"
              className="d-flex align-items-center text-decoration-none"
              id="profileDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg"
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", color: "#074799" }}
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
              style={{ backgroundColor: "white" }}
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  {" "}
                  Profile
                </a>
              </li>
              <li>
                <Link to={"/Register"} className="dropdown-item">
                  Register
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WhatsAppNavigation;
