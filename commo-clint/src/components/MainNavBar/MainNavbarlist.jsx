import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import TeamInbox from "../../pages/whatsappmarketing/TeamInbox";

const NavbarScreen = () => {
  const navItems = [
    { path: "/whatsappmarketing", label: "WhatsApp" },
    { path: "/email", label: "Email" },
    { path: "/cold-calling", label: "Cold Calling" },
    { path: "/sms", label: "SMS" },
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span
              className="brand-logo"
              style={{
                backgroundColor: "#074799",
                color: "white",
                borderRadius: 5,
                padding: "10px 20px",
              }}
            >
              COMMO
            </span>
          </Link>
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
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.path}
                    className="nav-link"
                    style={{ color: "#074799" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <div className="navbar-text ms-4">
                <span style={{ color: "#FF6347", fontWeight: "bold" }}>
                  7 Days Free Trial
                </span>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <TeamInbox />
    </div>
  );
};

export default NavbarScreen;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Link } from "react-router-dom";

// const NavbarScreen = () => {
//   const [isMainNav, setMainNav] = useState(true);
//   return (
//     <nav
//       className="navbar navbar-expand-lg sticky-top"
//       style={{ backgroundColor: "whitesmoke" }}
//     >
//       <div className="container-fluid">
//         <a className="navbar-brand" href="/">
//           <p
//             style={{
//               backgroundColor: "#074799",
//               color: "white",
//               borderRadius: 5,
//               fontSize: 15,
//               padding: "10px 20px",
//               width: "auto",
//               marginTop: 10,
//             }}
//           >
//             COMMO
//           </p>
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span
//             className="navbar-toggler-icon"
//             style={{ color: "#212121" }}
//           ></span>
//         </button>

//         {isMainNav ? (
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-evenly align-items-center w-100">
//               <li className="nav-item">
//                 <Link
//                   to="/whatsappmarketing"
//                   className="nav-link"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "#074799" }}
//                 >
//                   WhatsApp
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link"
//                   href="mailto:your.email@example.com"
//                   style={{ color: "#074799" }}
//                 >
//                   Email
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link"
//                   href="tel:+yourphonenumber"
//                   style={{ color: "#074799" }}
//                 >
//                   Cold Calling
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link"
//                   href="sms:+yourphonenumber"
//                   style={{ color: "#074799" }}
//                 >
//                   SMS
//                 </a>
//               </li>
//               <div className="navbar-text ms-4">
//                 <span style={{ color: "#FF6347", fontWeight: "bold" }}>
//                   7 Days Free Trial
//                 </span>
//               </div>
//             </ul>
//           </div>
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavbarScreen;
