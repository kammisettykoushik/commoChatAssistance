import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
    const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#FFF8EF",
        padding: "20px",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "40%",
          margin: "auto",
          textAlign: "center",
          borderRadius: "15px",
          border: "2px solid green",
        }}
      >
        {/* Email icon */}
        <div className="mb-3">
          <FaEnvelope style={{ fontSize: "4rem", color: "green" }} />
        </div>

        {/* Title */}
        <h4>Check Your Email</h4>

        {/* Instruction text */}
        <p>
          We sent a password reset link to your email. Please check your inbox.
        </p>

        {/* Button to check email */}
        <button
          style={{
            backgroundColor: "#032D60",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            margin: "10px 0",
          }}
          onClick={()=>navigate("/CreateNewPassword")}
        >
          Check Your Email
        </button>

        {/* Resend email message */}
        <div>
          <span>Didn't receive the email? </span>
          <button
            style={{
              backgroundColor: "transparent",
              color: "green",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
