import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import DirectFooter from "../../components/DFooter/footer";

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
          <p className="lead">Engage, inform, and convert customers directly through their phones</p>
          <button className="btn btn-light btn-lg">Learn More</button>
        </div>
      </section>


      <section className="container py-5" style={{ backgroundColor: "#f1f8e9",marginTop:30 }}>
        <h2 className="text-center text-success mb-4">Benefits of SMS Marketing</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Instant Reach</h5>
                <p className="card-text">
                  SMS messages have an incredibly high open rate. Most messages are read within minutes of being received.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Cost-Effective</h5>
                <p className="card-text">
                  Compared to other marketing methods, SMS marketing offers an affordable solution that suits both small and large businesses.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Wide Reach</h5>
                <p className="card-text">
                  SMS marketing allows you to reach your audience wherever they are, without needing internet connectivity.
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
              SMS marketing is a direct and effective communication channel that allows businesses to send promotional messages,
              offers, updates, and alerts straight to the consumer’s mobile device. With high open rates and real-time engagement,
              it’s one of the most powerful tools for reaching a broad audience instantly.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              src="https://www.brsender.com/images1/v1.jpg"
              alt="SMS Marketing Overview"
              className="img-fluid rounded shadow"
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
