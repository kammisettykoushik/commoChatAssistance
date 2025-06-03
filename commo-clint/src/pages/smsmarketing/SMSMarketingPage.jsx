import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import DirectFooter from "../../components/DFooter/footer";
// import whychoosesmsmarketing from "../../assets/images/whychoosesmsmarketing.jpg";
import whychoosesmsmarketingremovebgpreview from "../../assets/images/whychoosesmsmarketingremovebgpreview.png";

const SMSMarketingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#4CAF50", // SMS Marketing Green
          padding: "100px 0",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 className="display-4 font-weight-bold">Unlock the Power of SMS Marketing</h1>
          <p className="lead">Most messages are generally accessed within minutes of their arrival. </p>
          <button className="btn btn-light btn-lg">Learn More</button>
        </div>
      </section>


      <section className="container py-5" style={{ backgroundColor: "#f1f8e9",marginTop:30 }}>
        <h2 className="text-center text-success mb-4">Benefits of SMS Marketing</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Immediate Delivery</h5>
                <p className="card-text">
                  Messages are received within seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Simple & Direct</h5>
                <p className="card-text">
                  Short messages that deliver clear value.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Bulk Messaging</h5>
                <p className="card-text">
                  Send to thousands instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Cost-Efficient</h5>
                <p className="card-text">
                  Low cost per message, high impact.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Universal Reach</h5>
                <p className="card-text">
                  No internet needed, works on all phones.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Compliance Friendly</h5>
                <p className="card-text">
                  Easy to integrate opt-in/opt-out options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is SMS Marketing? */}
      <section className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="text-primary">What is SMS Marketing?</h2>
            <p className="lead text-muted">
            SMS Marketing offers a fast, reliable way to reach customers directly on their mobile phones.
            With nearly 100% open rates and instant delivery, it’s ideal for time-sensitive messages such as flash sales, payment reminders, order confirmations, and event alerts. 
            SMS doesn’t require internet access, making it universally accessible. It supports short, impactful messaging that captures attention quickly. 
            Businesses can personalize messages and send them in bulk using SMS platforms that allow scheduling, automation and real-time reporting. 
            Whether targeting existing clients or new leads, SMS Marketing ensures high visibility at low cost. 
            It’s a great complement to other channels like email or social media, driving quick actions like clicks, visits or purchases. 
            With proper timing and targeting, SMS campaigns can significantly boost engagement, improve customer experience, and drive repeat business. 
            </p>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <img
              src={whychoosesmsmarketingremovebgpreview}
              alt="SMS Marketing Overview"
              className="img-fluid"
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section
  className="container py-5"
  style={{
    // border: '1px solid green',
    boxShadow: '0 4px 8px rgba(0, 128, 0, 0.2)', // Add box shadow with greenish tint
  }}
>
        <h2 className="text-center text-indigo mb-4">Why Choose SMS Marketing?</h2>
        <p className="text-muted text-center mb-5">
          SMS marketing helps your business stay connected with customers, increases customer loyalty, and improves conversion rates.
          It’s fast, reliable, and has an unmatched ROI.
        </p>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">High Open Rates</h5>
                <p className="card-text">Text messages are opened 98% of the time, compared to only 20% for emails.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Personalized Communication</h5>
                <p className="card-text">SMS marketing allows personalized messages to be sent to specific customer segments.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Real-Time Engagement</h5>
                <p className="card-text">Receive immediate feedback from your customers with quick actions, like responses or clicks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
     

    
      {/* <section className="container py-5" style={{ backgroundColor: "#e8f5e9",marginTop:30 }}>
        <h2 className="text-center text-teal mb-4">Types of SMS Marketing</h2>
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-dark">Promotional SMS</h5>
            <p className="text-muted">
              Used to inform customers about special offers, discounts, or new products. Promotional SMS is usually time-sensitive.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-dark">Transactional SMS</h5>
            <p className="text-muted">
              Transactional SMS includes alerts like order confirmations, shipping updates, or account notifications. These messages are sent automatically.
            </p>
          </div>
        </div>
      </section> */}

    

    <DirectFooter/>
    </div>
  );
};

export default SMSMarketingPage;