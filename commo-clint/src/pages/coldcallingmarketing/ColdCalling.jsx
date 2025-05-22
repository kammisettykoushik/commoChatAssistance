import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectFooter from "../../components/DFooter/footer";
import realtimetracking from "../../assets/images/realtimetracking.jpg";
import automatedcalls from "../../assets/images/automatedcalls.jpg";
import custommessages from "../../assets/images/custommessages.jpg";
import coldcalling from "../../assets/homescreenimages/coldcallingmarketing.jpg";
// import "animate.css/animate.min.css";

const ColdCalling = () => {
  return (
    <div className="container-fluid">
      {/* Header Section */}
      <header className="text-white bg-dark py-5 text-center">
        <h1 className="display-4 animate__animated animate__fadeInDown">
          Cold Calling Services
        </h1>
        <p className="lead animate__animated animate__fadeInUp">
          Transform the way you connect with clients using our cutting-edge
          voice call solutions.
        </p>
      </header>

      {/* About Section */}
    
      <div className="features-section py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-4">Why Choose Our Service?</h2>
    <div className="row text-center g-4">
      {[
        { title: "Expert Support", description: "Get personalized support from our experts." },
        { title: "Scalable Solutions", description: "Solutions that grow with your business." },
        { title: "User-Friendly Interface", description: "Easily navigate and manage your projects." },
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


<section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-md-6 animate__animated animate__fadeInLeft">
              <h2>What is Cold Calling?</h2>
              <p>
                Cold calling is a direct outreach strategy that connects
                businesses with potential clients. It enables personal
                engagement, boosting conversions and creating impactful first
                impressions.
              </p>
              <p>
                Our services empower you with professional tools to amplify
                your marketing and outreach efforts.
              </p>
            </div>
            <div
              className="col text-center animate__animated animate__fadeInRight">
              <img
                src={coldcalling}
                alt="Cold Calling"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-light py-5">
  <div className="container text-center">
    <h2 className="animate__animated animate__fadeInDown">Our Features</h2>
    <div className="row mt-4">
      <div className="col-md-4 mb-4 d-flex">
        <div className="card h-100 shadow border-0 animate__animated animate__fadeInUp w-100">
          <img
            src={automatedcalls}
            className="card-img-top"
            alt="Automated Calls"
          />
          <div className="card-body">
            <h5 className="card-title">Automated Calls</h5>
            <p className="card-text">
              Reach a wider audience quickly with pre-scheduled calls.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4 d-flex">
        <div className="card h-100 shadow border-0 animate__animated animate__fadeInUp w-100">
          <img
            src={realtimetracking}
            className="card-img-top"
            alt="Automated Calls"
          />
          <div className="card-body">
            <h5 className="card-title">Real-Time Tracking</h5>
            <p className="card-text">
            Monitor the performance of your campaigns with analytics.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4 d-flex">
        <div className="card h-100 shadow border-0 animate__animated animate__fadeInUp w-100">
          <img
            src={custommessages}
            className="card-img-top"
            alt="Automated Calls"
          />
          <div className="card-body">
            <h5 className="card-title">Custom Messages
            </h5>
            <p className="card-text">
            Create messages tailored to your target audience's needs.


            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<DirectFooter/>
    </div>
  );
};

export default ColdCalling;
