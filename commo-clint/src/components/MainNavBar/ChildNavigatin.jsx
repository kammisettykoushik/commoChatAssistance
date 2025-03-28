import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ChildNavigatin = (props) => {

  const navigate = useNavigate();



  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "whitesmoke" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={props?.data?.path}>
          <p
            style={{
              color: "white",
              borderRadius: 5,
              fontSize: 15,
              padding: 5,
              width: "100%",
              marginTop: 15,
            }}
          >
            {props?.data?.icon}
          </p>
        </Link>

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
          <span className="navbar-toggler-icon" style={{ color: "#212121" }}></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {props?.data?.navigationLinks?.map((element, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link active" to={element.path} style={{ color: "#074799" }}>
                  {element.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          {/* <form className="d-flex me-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ border: "2px solid #074799", color: "#074799" }}
            />
            <button className="btn btn-outline-dark ms-2" type="submit" style={{ color: "#074799" }}>
              Search
            </button>
          </form> */}

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
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: "white" }}>
              {/* <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li> */}
              <li>

                <Link className="dropdown-item" to="/RegisterScreen">
                  Register
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/AdminScreen">
                  Admin
                </Link> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ChildNavigatin;
