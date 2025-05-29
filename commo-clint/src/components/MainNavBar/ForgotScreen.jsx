import React, { useState } from "react";
import { FaLock } from "react-icons/fa"; // Lock icon

const ForgotScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledAfterSuccess, setDisabledAfterSuccess] = useState(false); //  New state

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
    setDisabledAfterSuccess(false); // Re-enable if user edits email
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/authentication/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset link has been sent to your email.");
        setDisabledAfterSuccess(true); // Disable button after success
        // Optional: setEmail(""); // Keep email or clear it
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      console.error("Request error:", err);
    }

    setLoading(false);
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

        <div className="mb-3 text-center">
          <p>No worries! Enter your email address below,</p>
          <p>and we’ll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              disabled={loading || disabledAfterSuccess}
            />
            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#032D60", color: "white" }}
              disabled={loading || disabledAfterSuccess}
            >
              {loading ? "Sending..." : disabledAfterSuccess ? "Email Sent" : "Send Password Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotScreen;
