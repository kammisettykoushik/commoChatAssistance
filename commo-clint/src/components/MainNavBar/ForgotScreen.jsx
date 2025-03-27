import React, { useState } from "react";
import { FaLock } from "react-icons/fa"; // Forgot icon
import { useNavigate } from "react-router-dom";

const ForgotScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/CheckEmail")

    // Simple validation to check if the email is not empty
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      // Logic to handle password reset (e.g., API call)
      console.log("Password reset email sent to:", email);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFF8EF", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid green",
          padding: "20px",
          width: "40%",
          margin: "auto",
          marginBottom: 20,
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        <div className="text-center mb-3">
        <FaLock style={{ fontSize: "3rem", color: "#a85c32" }} />
        </div>
        <h5 className="text-center">Forgot Your Password?</h5>


        {/* Text explaining the forgot password */}
        <div className="mb-3">
          <p className="text-center">
           No worries! Enter Your Email Adress below,and 
          </p>
         <p className="text-center">we will send you a link to reset your password</p>
        </div>

        {/* Email input field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>

        {/* Send Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn w-100"
            style={{ backgroundColor: "#032D60", color: "white" }}
          >
            Send Password Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotScreen;
