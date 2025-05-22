import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HelpCenter = () => {
  return (
    <main className="container my-5">
      <div className="bg-blue p-5 rounded shadow-sm border border-dark">
        <h1 className="mb-3 text-primary text-center">Help Center</h1>
      <p>
            Need assistance? Visit our Help Center for step-by-step guidance, tutorials and best practices on using Commo’s features effectively
          </p>
    
        <h2 className="mt-4 text-secondary">FAQs (Frequently Asked Questions)</h2>
        <ul>
          <li>What services does Commo offer?</li>
          <li>Is my data safe with Commo?</li>
          <li>How do I create a campaign?</li>
          <li>Can I use all marketing channels at once?</li>
          <li>How do I track campaign performance?</li>
          <li>How does billing work?</li>
          <li>Can I upgrade or downgrade my plan?</li>
          <li>Is customer support available 24/7?</li>
          <li>How do I cancel my subscription?</li>
          <li>What’s included in the free trial?</li>
        </ul>

        <h2 className="mt-4 text-secondary">Contact Support</h2>
        <ul>
          <li>Need help fast? </li>
          <li>Our support team is available to assist you.</li>
          <li>Email:</li>
          <li>Phone: 9493401014</li>
          <li>Live Chat: Available Mon–Fri, 9:30 AM - 6:30 PM (IST)</li>

        </ul>

        <h2 className="mt-4 text-secondary">User Guide (Documentation)</h2>
        <ul>
            <p>Explore our comprehensive user guide that includes:</p>
          <li>Account setup and onboarding</li>
          <li>Channel integration (SMS, WhatsApp, Email, Cold Calling)</li>
          <li>Campaign creation & templates</li>
          <li>Lead management</li>
          <li>Analytics & reporting</li>
          <li>Compliance & consent management</li>
        </ul>

       
        <h2 className="mt-4 text-secondary">Unsubscribe / Opt-Out</h2>
        <p>You are receiving messages because you opted in via one of our services. If you no longer wish to receive communications: Click here to unsubscribe</p>
        <p>Or reply with “STOP” to any SMS or WhatsApp message</p>
        <h2 className="mt-4 text-secondary">Company Information</h2>
        <p>Trishoka Connect is a product of Trishoka Digital Services, 
            a leading provider of full-spectrum digital solutions including website development, marketing automation and multi-channel engagement.</p>
            <p>Trishoka Digital Services</p>
            <p>Hyderabad, Telangana, India</p>
        
        <h2 className="mt-4 text-secondary">Copyright & Credits</h2>
        <p>2025 Trishoka Connect. All rights reserved.</p>
        <p>Design, development and platform architecture by Trishoka Digital Services.</p>
        <p>Icons and assets used are licensed and credited to their respective creators.</p>
        
        
      </div>
    </main>
  );
};

export default HelpCenter;