import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    // Client-side validation
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/authentication/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: newPassword }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        alert(data.message || "Password reset successfully!");
        setError(""); // clear error
        navigate("/LoginScreen"); // Redirect to login page
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
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
          textAlign: "center",
          borderRadius: "15px",
          border: "2px solid green",
        }}
      >
        <div className="mb-3">
          <FaLock style={{ fontSize: "4rem", color: "#C3DEFF" }} />
        </div>

        <h4>Create a New Password</h4>
        <p>
          Enter your new password below to complete the reset process. Ensure
          it's strong and secure.
        </p>

        <div className="mb-3">
          <input
            type="password"
            placeholder="New Password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-danger" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleReset}
          style={{
            backgroundColor: "#032D60",
            color: "white",
            width: "50%",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
