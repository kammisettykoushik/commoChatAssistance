import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsandConditions = () => {
  return (
    <main className="container my-5">
      <div className="bg-blue p-5 rounded shadow-sm border border-dark">
        <h1 className="mb-3 text-primary text-center">Terms And Conditions</h1>
    
        <h2 className="mt-4 text-secondary">Definitions</h2>
        <p>
        Company, "we", "use", or "our" refers to Trishoka Digital Services
        </p>
        <ul>
          <li>User, "you", or "your" refers to any individual or entity using our platform. </li>
          <li>"Services" Services refers to our marketing software, including WhatsApp, SMS, cold calling and email marketing</li>
          <li>"Content" refers to messages, images, links, audio or video material sent using our platform</li>
        </ul>

        <h2 className="mt-4 text-secondary">Eligibility</h2>
        <p>
          To use our Services, You must
        </p>
        <ul>
            <li>Be at least 18 years old.</li>
            <li>Provide accurate and complete registration information.</li>
            <li>Not be prohibited from using our platforms by law or regulation.</li>
            <li>If using our Services on behalf of an entity you represent that you have the authority to bind that entity to these Terms.</li>
        </ul>

        <h2 className="mt-4 text-secondary">Account Registration and Security</h2>
        <ul>
          <li>you must provide valid contact and business details during registration.</li>
          <li>You are responsible for maintaining the security of your account and password.</li>
          <li>You must notify us immediately of any unauthorized access or use of your account.</li>
        </ul>
        <p>We reserve the right to suspend or terminate any account found engaging in fraudulent or illegal activities.</p>
        <h2 className="mt-4 text-secondary">Acceptable Use Policy</h2>
        <p>
          You must not:
        </p>
        <ul>
            <li>Send Spam, Unsolicited messages, or other unwanted communications.</li>
            <li>Send messages that are false, misleading, or deceptive.</li>
            <li>Send messages that violate Whatsapp,email,sms,telecom regulations</li>
            <li>Harass , threaten, or intimidate others.</li>
            <li>Violate WhatsApp, email, SMS or telecom regulations.</li>
            <li>Use our platform for illegal activities such as fraud or scams.</li>
        </ul>
        <p>Failure to comply may result in account suspension, termination or legal action.</p>
        <h2 className="mt-4 text-secondary">Messaging and Compliance</h2>
        <strong>WhatsApp Messaging:</strong>
        <ul>
            <li>you must follow Whatsapp's Business Policy and API Guidelines.</li>
            <li>we do not store the content of your messages.</li>
            <li>WhatsApp may delete your messages if they violate its policies.</li>
        </ul>
        <strong>Email Marketing:</strong>
        <ul>
            <li>you must comply with the CAN-SPAM Act and applicable email marketing laws</li>
            <li>Include a clear unsubscribe link in your emails.</li>
            <li>Avoid false, misleading, or deceptive email content.</li>
        </ul>
        <strong>SMS Marketing:</strong>
        <ul>
            <li>You must obtain opt -in consent from your recipients before sending messages.</li>
            <li>Comply with the Telephone Consumer Protection Act (TCPA) and related laws</li>
            <li>Users must be able to opt-out by replying with "3TDP"</li>
        </ul>
        <strong>Cold Calling:</strong>
        <ul>
            <li>You must comply with applicable Do Not Call (DNC) regulations. </li>
            <li>Robocalls and aggressive telemarketing are prohibited.</li>
            <li>Violations may result in account suspension without a refund.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Payment and subscripition</h2>
        <ul>
            <li>Our services may be free,paid or subscription-based</li>
            <li>Payments are processed via third-party gateways.</li>
            <li>Fees are listed on our website and are subject to change with prior notice.</li> 
            <li>Refunds are not provided except in cases of billing errors.</li>
        </ul>
        <p>Failure to make timely payments may result in account suspension or termination.</p>
        <h2 className="mt-4 text-secondary">Intellectual Property</h2>
        <p>Our platform and all content are protected by copyright and intellectual property laws.</p>
        <ul>
            <li>We retain ownership of our platform, content and branding.</li>
            <li>You May not copy , reproduce, distribute, or display our content without written permission.</li>
            <li>You retain Ownership of content sent through our platform</li>
        </ul>
        <h2 className="mt-4 text-secondary">Data privacy and security</h2>
        <ul>
            <li>we follow strict security protocols to protect your data.</li>
            <li>we do not sell or share your data with third parties.</li>
            <li>we comply with GDPR,CCPA and other applicable privacy laws.</li>
            <p>See our Privacy Policy for full details.</p>
        </ul>
        <h2 className="mt-4 text-secondary">Termination and Suspension</h2>
        <p>We may suspend or terminate your account without notice if:</p>
        <ul>
            <li>You violate these Terms or applicable laws.</li>
            <li>You Engage in abusive,fraudulent or illegal behavior.</li>
            <li>We are required to do so by legal authorities</li>
            <p>You may terminate your account at any time by contacting our support team.</p>
        </ul>
        <h2 className="mt-4 text-secondary">Disclaimer of warranties</h2>
        <ul>
            <li>our platform is provided on an "as is" and "as available" basis</li>
            <li>We do not guarantee uninterrupted or error-free service.</li>
            <li>We are not responsible for message delivery failures due to third-party services.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Limitation of Liability</h2>
        <p>To the maximum extent permitted by law we are not liable for:</p>
        <ul>
            <li>Loss of data,revenue or profits due to services disruptions.</li>
            <li>Damages arising from third party service failures.</li>
            <li>Legal issues resulting from improper platform use.</li>
            <p>Our total liability is limited to the amount you paid for our services in the last 3 months.</p>
        </ul>
        <h2 className="mt-4 text-secondary">Indemnification</h2>
        <p>You agree to indemnify and hold Trishoka Digital Services harmless from any claims, damages, losses or expenses arising from:</p>
        <ul>
            <li>Your use of our Services.</li>
            <li>Your violation of these Terms.</li>
            <li>Third party claims related to your use of the platform.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Governing Law and Dispute Resolution</h2>
        <ul>
            <li>These Terms are governed by the laws of India.</li>
            <li>Any disputes shall be resolved via binding arbitration in Hyderabad, India.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Changes to These Terms</h2>
        <ul>
          <li>We may update these Terms at any time.</li>
          <li>For significant changes, we will notify you by email or in-app notice.</li>
          <li>Continued use of our platform implies acceptance of the revised Terms.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Contact Us</h2>
        <p>For question or concerns,please contact:<a href="https://www.trishoka.com/contactus"><strong>Trishoka Digital Services</strong></a></p>
        <ul>
            <li>This details Terms and conditions documents ensures that you understand the rules and regulations of our platform.</li>
        </ul>
          </div>
    </main>
  );
};

export default TermsandConditions;