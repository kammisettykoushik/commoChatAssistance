import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectFooter from "../../components/DFooter/footer";
import whychoosewhatsappmarketing from "../../assets/images/whychoosewhatsappmarketing.jpg";
// import whychoosewhatsappmarketingremovebgpreview from "../../assets/images/whychoosewhatsappmarketingremovebgpreview.png";
import benefitsofwhatsappmarketing from "../../assets/images/benefitsofwhatsappmarketing.jpg";
// import benefitsofwhatsappmarketingremovebgpreview from "../../assets/images/benefitsofwhatsappmarketingremovebgpreview.png";

const WhatsAppMarketing = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
      {/* Hero Section */}
      <div
        className="text-center py-5"
        style={{ backgroundColor: "#25d366", color: "white" }}
      >
        <h1>Welcome to WhatsApp Marketing</h1>
        <p>Engage with your audience through the most popular messaging platform.</p>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Why Choose WhatsApp Marketing?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h5 className="card-title">High Engagement</h5>
                <p className="card-text">
                  Experience unparalleled open rates compared to email marketing.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h5 className="card-title">Rich Media Support</h5>
                <p className="card-text">
                  Send images, videos, and documents for enhanced communication.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h5 className="card-title">Real-Time Messaging</h5>
                <p className="card-text">
                  Interact with customers instantly for better engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container py-4">
        <h1 className="mb-4" style={{ fontFamily: 'Arial, sans-serif',  width: '55%', color: 'black', padding: 7 }}>
          WhatsApp Business Marketing
        </h1>

        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-6 mb-4" style={{ textAlign: 'justify', maxWidth: '800px' }}>
            <p style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.7' }}>
              WhatsApp Marketing allows businesses to communicate directly with customers through a highly engaging and personal platform. With high open and response rates, it enables quick updates, promotional messages, and customer support.
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.7' }}>
              Businesses can use bulk messaging to send content to multiple users at once, even to DND numbers, across all devices. It’s ideal for sending alerts, conducting surveys, and nurturing leads in real-time. Automation tools make it easy to schedule messages, run campaigns, and track delivery. WhatsApp creates a trusted space for business communication, helping brands build long-term relationships. Its cost-effectiveness and interactivity make it a preferred choice over traditional channels.
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.7' }}>
              Whether you're launching a new product or engaging loyal customers, WhatsApp Marketing ensures instant visibility and a personal touch that drives better engagement and conversions.
            </p>
          </div>

          <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-wrap justify-content-center">
            <div className="d-flex flex-column  align-items-center" style={{ flex: '1 1 45%' }}>
              <img
                src={whychoosewhatsappmarketing}
                alt="WhatsApp Marketing"
                className="img-fluid rounded-3 mb-3"
                style={{ objectFit: 'cover', width: '85%' }}
              />
             </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <h1 className="mb-4" style={{ fontFamily: 'Arial, sans-serif',  width: '55%', color: 'black', padding: 7 }}>
          Benefits Of WhatsApp Marketing
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
                src={benefitsofwhatsappmarketing}
                alt="WhatsApp Marketing"
                className="img-fluid rounded-3 mb-3"
                style={{ objectFit: 'cover', width: '83%' }}
              />
              </div>
          </div>
        </div>
      </div>


      {/* <div
        className="text-center py-5"
        style={{ backgroundColor: "#eaf9ea", color: "#000" }}
      >
        <h2>Get Started Today</h2>
        <p>Grow your business with the power of WhatsApp Marketing.</p>
        <button
          className="btn"
          style={{
            backgroundColor: "#25d366",
            color: "white",
            padding: "10px 30px",
            fontSize: "1.2rem",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Contact Us
        </button>
      </div> */}
      <div style={{ marginTop: 10 }}>
        <DirectFooter />
      </div>
    </div>
  );
};

export default WhatsAppMarketing;
