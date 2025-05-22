import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
  return (
    <main className="container my-5">
      <div className="bg-blue p-5 rounded shadow-sm border border-dark">
        <h1 className="mb-3 text-primary text-center">Privacy Policy</h1>
    
        <h2 className="mt-4 text-secondary">Information We Collect:</h2>
        <ul>
          <li>When you use Trishoka Connect’s services, we may collect the following information.</li>
          <li>Personal data such as name, email address, phone number and business details.</li>
          <li>Marketing data, including customer lists and campaign performance metrics.</li>
          <li>Technical information such as IP addresses, browser type and usage logs</li>
        </ul>

        <h2 className="mt-4 text-secondary">How We Use Your Information:</h2>
        <ul>
          <li>We use the collected data into</li>
          <li>Provide and improve our marketing services.</li>
          <li>Ensure compliance with legal and regulatory requirements.</li>
          <li>Monitor and prevent fraudulent activities.</li>
          <li>Communicate with users regarding updates, support and promotional offers.</li>

        </ul>

        <h2 className="mt-4 text-secondary">Data Sharing and Disclosure: </h2>
        <ul>
          <li>We do not sell, rent or share your personal information with third parties except in the following cases</li>
          <li>When required by law or legal proceedings</li>
          <li>The third-party service providers who assist in delivering our services.</li>
          <li>In the event of a business merger, sale or acquisition.</li>
        </ul>

       
        <h2 className="mt-4 text-secondary">Data Security:</h2>
        <ul>
          <li>We implement industry-standard security measures to protect your data from unauthorized access, loss or misuse. However, no method of transmission over the Internet is 100% secure</li>
        </ul>
        <h2 className="mt-4 text-secondary">User Rights and Choice:</h2>
        <ul>
        <li>ccess, update or delete their personal information.</li>
        <li>Opt out of receiving marketing communications.</li>
        <li>Request data portability where applicable.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Compliance with Legal Regulations:</h2>
        <ul>
        <li> We comply with all applicable data protection laws, including:</li>
        <li>The General Data Protection Regulation (GDPR) for European users.</li>
        <li>The California Consumer Privacy Act (CCPA) for California residents.</li>
        <li>Industry-specific regulations governing communication and marketing practices.</li>
        <li>Other local privacy laws where applicable</li>
        </ul>
        <h2 className="mt-4 text-secondary">Data Retention:</h2>
        <ul>
          <li>We retain personal information for as long as necessary to fulfill our services and comply with legal obligations. After this period, data is securely deleted or anonymized.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Children’s Privacy:</h2>
        <ul>
          <li>Our services are not intended for use by children under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have inadvertently gathered personal information from a child, we will take steps to delete such data promptly.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Updates to the privacy policy:</h2>
        <ul>
          <li>Changes to This Privacy Policy Trishoka Connect may update this Privacy Policy periodically. Continued use of our platform after changes are posted constitutes acceptance of the updated policy.</li>
        </ul>
        <h2 className="mt-4 text-secondary">Contact Us:</h2>
        <ul>
          <li>For any questions regarding this Privacy Policy, contact us.</li>
        </ul>
      </div>
    </main>
  );
};

export default PrivacyPolicy;