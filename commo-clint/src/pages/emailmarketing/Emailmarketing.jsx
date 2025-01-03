import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./EmailMarketing.css";

const EmailMarketing = () => {
  return (
    <div className="email-marketing-page">
      {/* Hero Section */}
      <div className="hero-section bg-gradient text-light text-center py-5">
  <div className="container">
    <h1 className="display-3 fw-bold text-uppercase text-warning">
      Email Marketing That Delivers
    </h1>
    <p className="lead mt-3 text-secondary">
      Build meaningful connections, drive growth, and achieve unparalleled
      success with our innovative email marketing solutions.
    </p>
    <button
      className="btn btn-light text-primary fw-semibold btn-lg mt-4 px-5 py-3"
      style={{
        borderRadius: "30px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      Get Started
    </button>
  </div>
</div>


      {/* Features Section */}
      <div className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Our Email Marketing?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="feature-card p-4 bg-light rounded shadow-sm">
                <h3>Customizable Templates</h3>
                <p>Create stunning emails with easy-to-use templates.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 bg-light rounded shadow-sm">
                <h3>Real-Time Analytics</h3>
                <p>Track your campaigns with detailed insights.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 bg-light rounded shadow-sm">
                <h3>Automation Tools</h3>
                <p>Save time with automated email campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works bg-light py-5">
  <div className="container">
    <h2 className="text-center mb-5 fw-bold">How It Works</h2>
    <div className="row align-items-center">
      {/* Left Image Section */}
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div
          className="animate__animated animate__fadeInLeft"
          style={{ animationDuration: "1s" }}
        >
          <img
            src="https://www.brsender.com/images/about/01.png"
            alt="How It Works"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      {/* Right Steps Section */}
      <div className="col-lg-6">
  <div
    className="p-4 rounded shadow-sm bg-light animate__animated animate__fadeInRight"
    style={{ animationDuration: "1.2s", backgroundColor: "#f9f9f9" }}
  >
    <ul className="list-group list-group-flush">
      <li
        className="list-group-item d-flex align-items-start border-0 mb-3"
        style={{
          backgroundColor: "transparent",
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <span
          className="badge rounded-circle bg-info text-white me-3"
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          1
        </span>
        <span>
          <strong style={{ color: "#0056b3" }}>Sign up</strong> and set your
          campaign goals.
        </span>
      </li>
      <li
        className="list-group-item d-flex align-items-start border-0 mb-3"
        style={{
          backgroundColor: "transparent",
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <span
          className="badge rounded-circle bg-info text-white me-3"
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          2
        </span>
        <span>
          <strong style={{ color: "#0056b3" }}>Choose a template</strong> or
          create your own.
        </span>
      </li>
      <li
        className="list-group-item d-flex align-items-start border-0 mb-3"
        style={{
          backgroundColor: "transparent",
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <span
          className="badge rounded-circle bg-info text-white me-3"
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          3
        </span>
        <span>
          <strong style={{ color: "#0056b3" }}>Send personalized emails</strong>{" "}
          to your audience.
        </span>
      </li>
      <li
        className="list-group-item d-flex align-items-start border-0"
        style={{
          backgroundColor: "transparent",
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <span
          className="badge rounded-circle bg-info text-white me-3"
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          4
        </span>
        <span>
          <strong style={{ color: "#0056b3" }}>Analyze performance</strong> with
          real-time analytics.
        </span>
      </li>
    </ul>
  </div>
</div>


    </div>
  </div>
</div>


      {/* Call to Action Section */}
      <div className="cta-section bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="mb-3">Ready to Boost Your Business?</h2>
          <p className="lead">
            Join thousands of businesses using our email marketing tools to
            achieve their goals.
          </p>
          <button className="btn btn-warning btn-lg">Start Now</button>
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;
