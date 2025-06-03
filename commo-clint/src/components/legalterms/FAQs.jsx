import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
function FAQs() {
  return (

    <main className="container my-5">
        <div className="bg-blue p-3 rounded shadow-sm border border-dark">
        <h1 className="mb-2 text-primary text-center">FAQs</h1>

    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header><b>What services does Trishoka Connect offer?</b></Accordion.Header>
        <Accordion.Body>
        Trishoka Connect offers the <b>best services in Hyderabad</b> for businesses looking to grow. 
        We specialize in <b>WhatsApp marketing, cold calling, email marketing, and SMS marketing.</b> 
        Our goal is to help you drive <b>lead generation, customer engagement,</b> and <b>improve your business</b> with proven marketing strategies. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><b>Is my data safe with Trishoka Connect?</b></Accordion.Header>
        <Accordion.Body>
      Yes, your data is completely safe with Trishoka Connect. 
      We use industry-leading encryption and strict privacy measures to protect your information across all services including <b>WhatsApp, cold calling, email, and SMS marketing.</b> 
      Trust us to deliver <b>great service</b> while keeping your business data secure. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header><b>How do I create a campaign?</b></Accordion.Header>
        <Accordion.Body>
        Creating a campaign is easy on Trishoka Connect. 
        Simply log in, choose your marketing channel (WhatsApp, cold calling, email, or SMS), define your audience, and launch your campaign. 
        Our easy-to-use platform ensures that you can start marketing campaigns that <b>improve your business quickly and efficiently.</b> 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header><b>Can I use all marketing channels at once?</b></Accordion.Header>
        <Accordion.Body>
        Yes! Trishoka Connect allows you to combine <b>WhatsApp marketing, cold calling, email marketing,</b>and <b>SMS marketing</b>
        into one powerful, <b>multi-channel campaign</b> to maximize your reach and boost your marketing success
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header><b>How do I track campaign performance?</b></Accordion.Header>
        <Accordion.Body>
          You can track all campaigns through our advanced Analytics Dashboard. 
          We provide real-time insights into message deliveries, open rates, call statuses, and customer responses, helping you <b>improve your business outcomes</b> and fine-tune your strategies. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header><b>How does billing work?</b></Accordion.Header>
        <Accordion.Body>
          Billing is flexible with monthly or annual subscriptions tailored to your business needs. 
          Special bundled plans for <b>WhatsApp marketing, cold calling, email marketing,</b> and <b>SMS marketing</b> are available to ensure 
          Trishoka Connect <b>delivers great service</b> at competitive pricing. 
        </Accordion.Body>
      </Accordion.Item> 
      <Accordion.Item eventKey="6">
        <Accordion.Header><b>Can I upgrade or downgrade my plan?</b></Accordion.Header>
        <Accordion.Body>
          Yes, you can easily upgrade or downgrade your plan based on your business growth. 
          Trishoka Connect is committed to providing <b>the best services in Hyderabad</b> that adapt to your needs. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header><b>Is customer support available 24/7?</b></Accordion.Header>
        <Accordion.Body>
          Yes, Trishoka Connect offers <b>24/7 customer support</b> through chat, email, and phone to assist you promptly. 
          We are dedicated to providing <b>great service</b> at every stage of your marketing journey. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8">
        <Accordion.Header><b>How do I cancel my subscription?</b></Accordion.Header>
        <Accordion.Body>
          You can cancel your subscription anytime through the account settings panel. 
          After cancellation, you will still have access to all active campaigns until the end of the billing period. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9">
        <Accordion.Header><b>What’s included in the free trial?</b></Accordion.Header>
        <Accordion.Body>
          The free trial includes access to all features — <b>WhatsApp marketing, cold calling, email marketing,</b> and <b>SMS marketing </b>
          tools — allowing you to experience how <b>Trishoka Connect can improve your business</b> without any upfront investment. 
        </Accordion.Body>
      </Accordion.Item>
      {/* <Accordion.Item eventKey="10">
        <Accordion.Header>Accordion Item #11</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="11">
        <Accordion.Header>Accordion Item #12</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
    </div>
    </main>

  );
}

export default FAQs;
