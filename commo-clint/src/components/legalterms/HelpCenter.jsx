import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HelpCenter = () => {
  return (
    <main className="container my-5">
      <div className="bg-blue p-5 rounded shadow-sm border border-dark">
        <h1 className="mb-3 text-primary text-center">Help Center</h1>
      <p>
            Need assistance? Our Help Center offers step-by-step guides, tutorials and best help you make the most of Trishoka Connect's features.
          </p>
  
        <h2 className="mt-4 text-secondary">Contact Support</h2>
        <ul>
          <li>Need help Urgently? </li>
          <li>Our support team is here for you.</li>
          <li>Email:</li>
          <li>Phone: 9493401014</li>
          <li>Live Chat: Available Mon–Fri, 9:30 AM - 6:30 PM (IST)</li>

        </ul>

        <h2 className="mt-4 text-secondary">User Guide</h2>
        <ul>
            <p>Explore our comprehensive documentation, including:</p>
          <li>Account setup and onboarding</li>
          <li>Channel integration (SMS, WhatsApp, Email, Cold Calling)</li>
          <li>Campaign creation & templates</li>
          <li>Lead management</li>
          <li>Analytics & reporting</li>
          <li>Compliance & consent management</li>
        </ul>

       
        <h2 className="mt-4 text-secondary">Unsubscribe / Opt-Out</h2>
        <p>You are receiving messages because you opted in via one of our services.</p>
        <p>To stop receiving communications:</p>
        <ul>
          <li>Click here to unsubscribe</li>
          <li>Or reply with “STOP” to any SMS or WhatsApp message</li>
        </ul>
        <h2 className="mt-4 text-secondary">Company Information</h2>
        <p>Trishoka Connect is a product of Trishoka Digital Services, 
            a premier provider of end-to-end digital solutions, including website development, marketing automation and multi-channel engagement.</p>
            <p>Trishoka Digital Services</p>
            <p>Hyderabad, Telangana, India</p>
        
        <h2 className="mt-4 text-secondary">Copyright & Credits</h2>
        <p>2025 Trishoka Connect. All rights reserved.</p>
        <p>Design, development and platform architecture by Trishoka Digital Services.</p>
        <p>Icons and assets are licensed and credited to their respective creators.</p>
        
        
      </div>
    </main>
  );
};

export default HelpCenter;