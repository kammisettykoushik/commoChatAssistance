import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Green checkmark icon
import { useNavigate } from "react-router-dom";
const PasswordResetSuccessScreen = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/LoginScreen")
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
        {/* Green checkmark icon */}
        <div className="text-center mb-3">
          <FaCheckCircle style={{ fontSize: "3rem", color: "green" }} />
        </div>

        {/* Success message */}
        <h5 className="text-center">Your password has been successfully reset!</h5>

        {/* Instruction message */}
        <div className="mb-3 text-center">
          <p>Now you can login with your new password.</p>
        </div>

        {/* Back to Login button */}
        <div className="text-center">
          <button
            onClick={handleBackToLogin}
            className="btn w-100"
            style={{ backgroundColor: "#032D60", color: "white" }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccessScreen;
