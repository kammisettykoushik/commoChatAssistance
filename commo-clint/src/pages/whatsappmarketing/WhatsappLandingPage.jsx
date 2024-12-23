import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./WhatsappLandingPage.module.scss";
const WhatsappLandingPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Welcome Message */}
      <div style={{ textAlign: "left", margin: "20px 10%" }}>
        <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Hello, Sneha!
        </span>
        <h6 style={{ margin: "10px 0" }}>Welcome to Team Inbox!</h6>
      </div>

      {/* Message Section */}
      <div className={styles.Testingstyle}>
        <h6>Send your first message to check out Team Inbox</h6>
        <p>
          You must send a WhatsApp Message starting with
          <span style={{ fontSize: "1em", fontWeight: "bold" }}> #e9r7p</span>
        </p>

        {/* Card Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              flex: "1 1 calc(48% - 20px)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              maxWidth: "calc(48% - 20px)",
              lineHeight: 1.5,
            }}
          >
            <p style={{ fontWeight: "bold", color: "#074799" }}>
              Send a message
            </p>
            <ul>
              <li>Use below buttons to send a pre-filled WhatsApp message</li>
              <li>
                You can also save <b>+91 9876543568</b> to your contacts and
                send a message starting with <b>#e9r7P</b>
              </li>
            </ul>

            <button style={buttonStyle}>
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                WhatsApp Web
              </a>
            </button>
          </div>
          <b style={{ textAlign: "center", marginTop: "8%" }}>Or</b>
          {/* Card 2 */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              flex: "1 1 calc(48% - 20px)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              maxWidth: "calc(48% - 20px)",
              lineHeight: 1.5,
            }}
          >
            <p style={{ fontWeight: "bold", color: "#074799" }}>
              Scan the QR Code
            </p>
            <div style={{ display: "flex" }}>
              <div>
                <ul>
                  <li>Use your phone camera to scan the QR code</li>
                  <li>Tap the link to open a pre-filled WhatsApp message</li>
                  <li>Scan the QR Code with Your Smartphone Camera</li>
                  <li>Aim Your Camera at the QR Code</li>
                </ul>
              </div>
              <div>
                <img
                  src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M="
                  style={{ height: "50%", width: 80, backgroundColor: "gray" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "white",
  color: "#074799",
  border: "1px solid #074799",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
  marginLeft: 10,
};

export default WhatsappLandingPage;
