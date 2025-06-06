import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectFooter from "../../components/DFooter/footer";
import whychooseemailmarketing from "../../assets/images/whychooseemailmarketing.png";
import benefitsofemailmarketing from "../../assets/images/benefitsofemailmarketing.jpg";
import emailmarketing from "../../assets/images/emailmarketing.jpg";

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
                Transform your enterprise through cutting-edge email campaigns that establish connections, 
                foster engagement, and drive conversions. Build substantial bonds and reach outstanding advancement effortlessly. 
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
       <section className="container py-5">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="text-primary">What is Email Marketing?</h2>
                  <p className="lead text-muted">
                  Email Marketing is one of the most effective digital marketing tools for nurturing leads, engaging existing customers, and driving conversions. 
                  It allows businesses to send personalized content, promotional offers, newsletters and important updates directly to their subscribers’ inboxes. 
                  With advanced tools, you can segment your audience, track open rates, clicks, and optimize campaigns for better performance. 
                  Email marketing is cost-effective and scalable—whether you're targeting 100 or 10,000 contacts. 
                  Automated email workflows can guide prospects through the sales funnel, boost customer retention and increase lifetime value. 
                  From welcome emails to product recommendations and seasonal campaigns, email marketing delivers measurable ROI. When done right, it keeps your brand top-of-mind and encourages customer loyalty. 
                  With design flexibility and rich content options, it’s a vital part of any long-term digital strategy. 
                  </p>
                </div>
                <div className="col-lg-5 offset-lg-1">
                  <img
                    src={whychooseemailmarketing}
                    alt="SMS Marketing Overview"
                    className="img-fluid"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </section>
                  <div className="container py-4">
                    <h1 className="mb-4" style={{ fontFamily: 'Arial, sans-serif',  width: '55%', color: 'black', padding: 7 }}>
                      Benefits Of Email Marketing
                    </h1>
            
                    <div className="row d-flex align-items-center">
                      <div className="col-12 col-md-6 mb-4" style={{ textAlign: 'justify', maxWidth: '800px' }}>
            <ul style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.7' }}>
              <li><b>Instant Feedback:</b> Enables real-time customer interaction.</li>
              <li><b>High Open Rates:</b>Messages are frequently read within just a few minutes.</li>
              <li><b>DND Compatible:</b> Works even with numbers on the Do Not Disturb list.</li>
              <li><b>Device Independent:</b> Delivers messages across all smartphones and platforms.</li>
              <li><b>Bulk Messaging:</b> Reach thousands at once with a single click.</li>
              <li><b>Automation Ready:</b> Schedule and send messages effortlessly.</li>
              <li><b>Cost-Effective:</b> Low marketing cost with high ROI.</li>
              <li><b>Personalized Communication:</b> Builds trust and improves customer loyalty.</li>
              <li><b>Polls & Surveys:</b> Easily collect customer opinions and feedback.</li>
              <li><b>Lead Generation:</b> Convert more leads through direct engagement.</li>
            </ul>
            
                      </div>
            
                      <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-wrap justify-content-center">
                        <div className="d-flex flex-column align-items-center" style={{ flex: '1 1 45%' }}>
                          <img
                            src={benefitsofemailmarketing}
                            alt="WhatsApp Marketing"
                            className="img-fluid rounded-3 mb-3"
                            style={{ objectFit: 'cover', width: '83%' }}
                          />
                          </div>
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
                src= {emailmarketing}
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
