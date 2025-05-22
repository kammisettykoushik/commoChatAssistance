import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectFooter from "../../components/DFooter/footer";
import whychooseemailmarketing from "../../assets/images/whychooseemailmarketing.jpg";

const EmailMarketing = () => {
  return (
    <div className="email-marketing-page">
      {/* Hero Section */}
      <div className="hero-section bg-dark text-light text-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className="display-4 fw-bold text-warning">
                Revolutionize Your Email Marketing
              </h1>
              <p className="lead mt-3 text-light">
                Transform your business with innovative email campaigns that connect, engage, and convert.
                Build meaningful relationships and achieve remarkable growth with ease.
              </p>
              <button
                className="btn btn-warning text-dark fw-bold btn-lg mt-4 px-5 py-3"
                style={{
                  borderRadius: "30px",
                  boxShadow: "0 5px 15px rgba(255,193,7,0.5)",
                }}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Our Email Marketing?</h2>
          <div className="row text-center g-4">
            {[
              { title: "Customizable Templates", description: "Create stunning emails with easy-to-use templates." },
              { title: "Real-Time Analytics", description: "Track your campaigns with detailed insights." },
              { title: "Automation Tools", description: "Save time with automated email campaigns." },
            ].map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="feature-card p-4 bg-white rounded shadow-sm h-100">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Image Section */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src= {whychooseemailmarketing}
                style={{ animationDuration: "1s", maxWidth: "100%", height: "auto", borderRadius: "20px", }}
                alt="How It Works"
                className="img-fluid rounded animate__animated animate__fadeInLeft"
               
              />
            </div>

            {/* Right Steps Section */}
            <div className="col-lg-6">
              <div className="p-4 rounded bg-white shadow animate__animated animate__fadeInRight">
                <h2 className="mb-4 fw-bold">How It Works</h2>
                <ul className="list-group list-group-flush">
                  {[
                    "Sign up and set your campaign goals.",
                    "Choose a template or create your own.",
                    "Send personalized emails to your audience.",
                    "Analyze performance with real-time analytics.",
                    "Optimize your strategy based on insights.",
                  ].map((step, index) => (
                    <li
                      className="list-group-item d-flex align-items-start border-0 mb-3"
                      style={{ backgroundColor: "transparent" }}
                      key={index}
                    >
                      <span
                        className="badge rounded-circle text-white me-3"
                        style={{
                          backgroundColor: "pink",
                          minWidth: "50px",
                          height: "50px",
                          lineHeight: "40px",
                          textAlign: "center",
                          fontSize: "1rem",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span>
                        <strong style={{ color: "#0056b3" }}>{step.split(" ")[0]}</strong>
                        {" " + step.substring(step.indexOf(" "))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DirectFooter />
    </div>
  );
};

export default EmailMarketing;
