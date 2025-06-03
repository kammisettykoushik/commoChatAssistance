import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
  return (
    <main className="container my-5">
      <div className="bg-blue p-5 rounded shadow-sm border border-dark">
        <h1 className="mb-3 text-primary text-center">Privacy Policy</h1>
    
        <h2 className="mt-4 text-secondary">Information We Collect:</h2>
        <p>We collect information to deliver our services, personalize your experience, enhance platform performance, and meet operational requirements. This includes:</p>
        <b>Infornation You Provide</b>
        <ul>
          <li>Name, email address, and phone number.</li>
          <li>Company name and job title (if applicable) .</li>
          <li>Billing details and payment method (processed securely via third-party providers)</li>
          <li>Account login credentials (securely encrypted)</li>
          <li>Profile details such as preferences, interests, and photo</li>
          <li>Any messages, emails, or support communications you send us</li>
        </ul>
        <b>Automatically Collected Information</b>
        <ul>
          <li>Device type, brand, model, and operating system</li>
          <li>Browser type and settings</li>
          <li>IP address and geolocation (if permissions are granted)</li>
          <li>Pages visited, session duration, and interaction patterns</li>
          <li>Referring sources, error logs, and crash reports</li>
        </ul>
        <b>Cookies and Tracking Technologies</b>
          <p>We use cookies and similar technologies to understand user behavior and improve experiences. This includes:</p>
          <ul>
            <li>Session and persistent cookies</li>
            <li>Third-party cookies from services like Google Analytics or Meta</li>
            <li>Information such as session IDs, preferences, and device identifiers</li>
          </ul>
          <p>You can manage cookie settings in your browser.</p>
          <b>Information from Third Parties</b>
          <p>We may receive data from:</p>
          <ul>
            <li>Partners and clients using Trishoka Connect</li>
            <li>Social media platforms used for login or interaction</li>
            <li>Analytics and advertising providers</li>
            <li>CRM integrations or referrals</li>
          </ul>
          <p>This data is used to enhance service delivery and improve targeting.</p>
          <b>User-Generated Content</b>
          <p>When you use features allowing uploads or feedback, we may collect:</p>
          <ul>
            <li>Text, images, and documents shared</li>
            <li>Ratings, survey responses, or comments</li>
          </ul>
          <b>Support and Communications</b>
          <p>When you contact us, we may collect:</p>
          <ul>
            <li>Your name, email, and phone</li>
            <li>The content and timing of your communication</li>
            <li>Related support ticket details or chat history</li>
          </ul>

        <h2 className="mt-4 text-secondary">How We Use Your Information:</h2>
        <p>We process your information for the following purposes:</p>
        <b>To Provide and Operate the Platform</b>
        <ul>
          <li>Create and manage user accounts</li>
          <li>Enable core platform features and send platform-related communications</li>
        </ul>
        <b>To Personalize Your Experience</b>
        <ul>
          <li>Remember preferences and adjust interface behavior</li>
          <li>Provide location-based functionality (with permission)</li>
        </ul>
        <b>To Improve Our Services</b>
        <ul>
          <li>Analyze usage to identify bugs and performance issues</li>
          <li>Develop new features and improve functionality</li>
        </ul>
        <b>To Communicate With You</b>
        <ul>
          <li>Respond to inquiries and send service notifications</li>
          <li>Send promotional updates (only if you opt in)</li>
        </ul>
        <b>To Manage Payments</b>
        <ul>
          <li>Process billing securely via external providers</li>
          <li>Prevent fraud and ensure secure transactions</li>
        </ul>
        <b>To Ensure Security</b>
        <ul>
          <li>Monitor for abuse, unauthorized access, and fraud</li>
          <li>Enforce Terms & Conditions and secure our systems</li>
        </ul>
        <b>To Comply With Regulations and Policies</b>
        <ul>
          <li>Meet legal, regulatory, and contractual obligations</li>
          <li>Handle complaints or resolve disputes</li>
        </ul>
        <b>To Analyze and Generate Insights</b>
        <ul>
          <li>Create anonymized reports and usage trends</li>
          <li>Measure campaign performance and audience engagement</li>
        </ul>
                <h2 className="mt-4 text-secondary">Your Rights</h2>
        <p>Depending on your location and applicable data protection laws, you may have rights such as:</p>
        <ul>
          <li><b>Access:</b> Request a copy of your personal data.</li>
          <li><b>Rectify:</b> Correct inaccurate or incomplete data.</li>
          <li><b>Delete:</b> Request deletion of data no longer needed.</li>
          <li><b>Restrict Processing:</b>Ask to limit how your data is used in specific situations.</li>
          <li><b>Data Portability:</b>Receive your data in a portable format.</li>
          <li><b>Object:</b>Decline use of your data for certain purposes.</li>
          <li><b>Withdraw Consent:</b>Revoke permission you've given at anytime.</li>
          <li><b>Complain:</b>File a complaint with a relevant Data Protection Authority</li>
        </ul>
        <h2 className="mt-4 text-secondary">Cookies and Tracking Tools</h2>
        <p>We use cookies and similar tools for various purposes:</p>
        <b>Types of Cookies We Use</b>
        <ul>
          <li><b>Essential:</b> Required for platform functionality.</li>
          <li><b>Performance:</b> Help analyze usage and improve performance.</li>
          <li><b>Functionality:</b> Store your preferences.</li>
          <li><b>Marketing:</b> Support advertising and retargeting</li>
        </ul>
        <b>Managing Cookies</b>
        <p>You can control cookie behavior in your browser settings. 
          Disabling essential cookies may affect the functionality of the platform. 
          For more information, please refer to our Cookie Policy. </p>

        <h2 className="mt-4 text-secondary">Third-Party Services</h2>
        <p>We may link to or integrate with external services (e.g., Google, Meta, payment gateways). 
          These services have their own privacy policies and operate independently. 
          We recommend reviewing those policies directly.</p>
       
        <h2 className="mt-4 text-secondary">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy periodically. 
          The “Last Updated” date will reflect the most recent changes. 
          If the changes are significant, we may notify you via email or in-app notification. 
          Continued use of Trishoka Connect constitutes acceptance of the revised policy.</p>

        <h2 className="mt-4 text-secondary">Data Retention:</h2>
        <p>We retain personal data for as long as:</p>
        <ul>
          <li>Your account remains active</li>
          <li>It is necessary to provide services or meet internal requirements</li>
          <li>Legal, audit, or tax obligations require it</li>
        </ul>
        <p>After this period, your data is securely deleted, anonymized, or de-identified.</p>

        <h2 className="mt-4 text-secondary">Children’s Privacy:</h2>
        <p>Trishoka Connect is not intended for individuals under 18 years old. 
          We do not knowingly collect data from minors without verified parental consent. 
          If you believe a minor's data has been collected, please contact us to request deletion.</p>

        <h2 className="mt-4 text-secondary">International Data Transfers</h2>
        <p>If you access our services from outside India, 
          your information may be stored or processed in India or other countries where our service providers operate.
          We use appropriate measures to ensure your data remains secure and consistent with this Privacy Policy.</p>

        <h2 className="mt-4 text-secondary">Contact Us:</h2>
        <p>If you have any questions, concerns, or requests related to this Privacy Policy, please contact:</p>
        <b>Trishoka Digital Services</b>
        <ul>
          <li>Email: <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new">info.trishoka@gmail.com</a></li>
          <li>website: <a href="https://www.trishoka.com/">www.trishoka.com</a></li>
        </ul>
      </div>
    </main>
  );
};

export default PrivacyPolicy;