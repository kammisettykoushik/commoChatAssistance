import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheck, FaReply, FaTruck, FaEye, FaPaperPlane, FaTimes, FaSyncAlt } from "react-icons/fa";

const BroadCast = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("one-week");

  const messages = [
    { id: 1, count: 4, label: "Sent", date: "2025-01-01", icon: <FaPaperPlane /> },
    { id: 2, count: 4, label: "Replied", date: "2025-01-02", icon: <FaReply /> },
    { id: 3, count: 4, label: "Delivered", date: "2025-01-03", icon: <FaTruck /> },
    { id: 4, count: 4, label: "Read", date: "2025-01-04", icon: <FaEye /> },
    { id: 5, count: 4, label: "Sending", date: "2025-01-05", icon: <FaCheck /> },
    { id: 6, count: 4, label: "Failed", date: "2025-01-06", icon: <FaTimes /> },
    { id: 7, count: 4, label: "Processing", date: "2025-01-07", icon: <FaSyncAlt /> },
  ];

  // Filter messages based on the selected dates
  const filteredMessages = messages.filter((message) => {
    if (!pickupDate || !endDate) return true;
    const messageDate = new Date(message.date);
    const startDate = new Date(pickupDate);
    const end = new Date(endDate);
    return messageDate >= startDate && messageDate <= end;
  });

  return (
    <div className="container mt-4">

<div className="row align-items-center mb-4">
  {/* Pickup Date */}
  <div className="col-md-4 mb-3">
    <div className="d-flex align-items-center">
      <label
        className="form-label mb-0"
        style={{
          fontWeight: "bold",
          marginRight: "15px",
          fontSize: "1.1rem",
          width: "120px", // Make the label occupy a consistent width
        }}
      >
        Pickup Date
      </label>
      <input
        type="date"
        className="form-control"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
        style={{
          border: "none",
          borderBottom: "2px solid #ccc",
          borderRadius: 0,
          maxWidth: "200px",
        }}
      />
    </div>
  </div>

  {/* End Date */}
  <div className="col-md-4 mb-3">
    <div className="d-flex align-items-center">
      <label
        className="form-label mb-0"
        style={{
          fontWeight: "bold",
          marginRight: "15px",
          fontSize: "1.1rem",
          width: "120px", // Same width as Pickup Date label
        }}
      >
        End Date
      </label>
      <input
        type="date"
        className="form-control"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{
          border: "none",
          borderBottom: "2px solid #ccc",
          borderRadius: 0,
          maxWidth: "200px",
        }}
      />
    </div>
  </div>

  {/* Period */}
  <div className="col-md-4 mb-3">
    <div className="d-flex align-items-center">
      <label
        className="form-label mb-0"
        style={{
          fontWeight: "bold",
          marginRight: "15px",
          fontSize: "1.1rem",
          width: "120px", // Same width as other labels
        }}
      >
        Period
      </label>
      <select
        className="form-select"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        style={{
          border: "none",
          borderBottom: "2px solid #ccc",
          borderRadius: 0,
          maxWidth: "200px",
        }}
      >
        <option value="one-week">One Week</option>
        <option value="one-month">One Month</option>
        <option value="three-months">Three Months</option>
      </select>
    </div>
  </div>
</div>

<div className="container" style={{ width: '70%', marginBottom: 30 }}>
  <h2>Outline Preview</h2>
  
  {/* First Row: Display up to 4 cards */}
  <div className="row g-3 justify-content-center" style={{ marginBottom: 20, marginTop: 20 }}>
    {filteredMessages.slice(0, 4).map((message) => (
      <div key={message.id} className="col-md-3 d-flex justify-content-center">
        <div
          className="card d-flex align-items-center justify-content-center text-center p-3 shadow"
          style={{
            backgroundColor: "#fff",
            border: "2px solid green",
            borderRadius: "10px",
            width: "100%",
            gap: "10px",
          }}
        >
          {/* Icon and Number - Justify Content Between */}
          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{message.count}</div>
            <div  style={{
    fontSize: "1rem",
    backgroundColor: "#27468a",
    color: "white",
    padding: "5px",
    borderRadius: "50%",
    textAlign: "center",
    display: "inline-flex",
    justifyContent: "center", 
    alignItems: "center",
    width: "40px",
    height: "40px",
  }}>{message.icon}</div>
          </div>

          {/* Label - Left Aligned */}
          <p style={{ fontSize: "1rem", margin: 0, textAlign: "left", width: "100%" }}>{message.label}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Second Row: Display the remaining cards */}
  <div className="row g-3 justify-content-center">
    {filteredMessages.slice(4).map((message) => (
      <div key={message.id} className="col-md-3 d-flex justify-content-center">
        <div
          className="card d-flex align-items-center justify-content-center text-center p-3 shadow"
          style={{
            backgroundColor: "#fff",
            border: "2px solid green",
            borderRadius: "10px",
            width: "100%",
            gap: "10px",
          }}
        >
          {/* Icon and Number - Justify Content Between */}
          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{message.count}</div>
            <div
  style={{
    fontSize: "1rem",
    backgroundColor: "#27468a",
    color: "white",
    padding: "5px",
    borderRadius: "50%",
    textAlign: "center",
    display: "inline-flex",
    justifyContent: "center", 
    alignItems: "center",
    width: "40px",
    height: "40px",
  }}
>
  {message.icon}
</div>


          </div>

          {/* Label - Left Aligned */}
          <p style={{ fontSize: "1rem", margin: 0, textAlign: "left", width: "100%" }}>{message.label}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default BroadCast;
