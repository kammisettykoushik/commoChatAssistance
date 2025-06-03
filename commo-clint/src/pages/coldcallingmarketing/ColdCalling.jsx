import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectFooter from "../../components/DFooter/footer";
import realtimetracking from "../../assets/images/realtimetracking.jpg";
import automatedcalls from "../../assets/images/automatedcalls.jpg";
import custommessages from "../../assets/images/custommessages.jpg";
import coldcalling from "../../assets/homescreenimages/coldcallingmarketing.png";
import benefitsofcoldmarketing from "../../assets/images/benefitsofcoldmarketing.jpg";
// import "animate.css/animate.min.css";


const ColdCalling = () => {
  return (
    <div className="container-fluid">
      {/* Header Section */}
      <header className="text-black py-5 text-center" style={{ backgroundColor: '#e8dffc' }}>
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
              Cold Calling is a direct and proactive method of reaching out to potential customers via telephone.
              It helps businesses generate leads, pitch products or services, and build relationships through personal interaction. 
              Unlike other digital methods, cold calling allows real-time dialogue, enabling immediate feedback, objection handling, and trust-building. 
              It’s especially effective in B2B environments where personal connections influence purchasing decisions. 
              Cold calling can be highly targeted, using researched contact lists to reach the right audience. With the right script, tone and approach, it opens doors to opportunities that digital ads might miss. 
              It also provides valuable insights into customer needs and market trends.
              Cold calling may seem traditional, but when done professionally and persistently, it remains one of the most powerful tools in a sales team’s toolkit for driving results and growing business networks. 
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
      <div className="container py-4">
        <h1 className="mb-4" style={{ fontFamily: 'Arial, sans-serif',  width: '50%', color: 'black', padding: 10 }}>
          Benefits Of Cold Calling
        </h1>

        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-6 mb-4" style={{ textAlign: 'justify', maxWidth: '800px' }}>
            <ul style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.7' }}>
              <li><b>Direct Interaction:</b>Engage leads in real time with two-way communication.</li>
              <li><b>Immediate Feedback:</b>Understand customer objections and respond instantly.</li>
              <li><b>Human Touch:</b>Builds rapport and trust more effectively than text-based methods.</li>
              <li><b>Customizable Pitch:</b>Tailor conversations based on customer responses.</li>
              <li><b>Highly Targeted:</b>Call only qualified leads to maximize efficiency.</li>
              <li><b>Market Insight:</b>Obtain significant insights into customer preferences and actions</li>
              <li><b>Fast Conversions:</b>Close deals quicker with real-time persuasion.</li>
              <li><b>Affordable:</b> Cost-effective with minimal infrastructure requirements.</li>
              <li><b>Personal Follow-Up:</b>Easier to build long-term relationships post-call.</li>
              <li><b>Scalable:</b>Easily scale calling teams based on business growth.</li>
            </ul>
          </div>
                    <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-wrap justify-content-center">
                      <div className="d-flex flex-column align-items-center" style={{ flex: '1 1 45%' }}>
                        <img
                          src={benefitsofcoldmarketing}
                          alt="WhatsApp Marketing"
                          className="img-fluid rounded-3 mb-3"
                          style={{ objectFit: 'cover', width: '83%' }}
                        />
                        </div>
                    </div>
        </div>
      </div>
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
