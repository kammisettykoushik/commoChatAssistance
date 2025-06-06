import React, { useState } from "react";
import { FaLock } from "react-icons/fa"; // Lock icon for security
import { useNavigate } from "react-router-dom";
const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 10) {
      setError("Password must be at least 10 characters.");
    } else {
      setError("");
      console.log("Password reset successful");
      // Add further logic to complete password reset
    }
    navigate("/PasswordResetSuccessScreen")
  };

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
        {/* Lock icon */}
        <div className="mb-3">
          <FaLock style={{ fontSize: "4rem", color: "#C3DEFF" }} />
        </div>

        {/* Title */}
        <h4>Create a New Password</h4>

        {/* Instruction text */}
        <p>
          Enter your new password below to complete the reset process. Ensure
          it's strong and secure.
        </p>

        {/* Password input field */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="New Password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
          {/* <span style={{ fontSize: "14px", color: "#888" }}>
            Must be at least 10 characters.
          </span> */}
        </div>

        {/* Confirm password input field */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}

        {/* Done button */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#032D60",
            color: "white",
            width:'50%',
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CreateNewPassword;
