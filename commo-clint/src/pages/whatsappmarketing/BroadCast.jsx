import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaReply, FaTruck, FaEye, FaPaperPlane, FaTimes, FaSyncAlt } from "react-icons/fa";
import axios from "axios";

const BroadCast = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("one-week");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const allStatuses = [
    { label: "Sent", icon: <FaPaperPlane /> },
    { label: "Replied", icon: <FaReply /> },
    { label: "Delivered", icon: <FaTruck /> },
    { label: "Read", icon: <FaEye /> },
    { label: "Sending", icon: <FaCheck /> },
    { label: "Failed", icon: <FaTimes /> },
    { label: "Processing", icon: <FaSyncAlt /> },
  ];

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates`,
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        const templates = response.data;

        // Count templates by status
        const statusCounts = {};
        allStatuses.forEach((status) => (statusCounts[status.label] = 0));
        templates.forEach((template) => {
          if (statusCounts.hasOwnProperty(template.status)) {
            statusCounts[template.status]++;
          }
        });

        const broadcastMessages = allStatuses.map((status, index) => ({
          id: index + 1,
          count: statusCounts[status.label],
          label: status.label,
          date: new Date().toISOString().split("T")[0], // Static date for summary
          icon: status.icon,
        }));

        setMessages(broadcastMessages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching template data:", err);
        setError("Failed to load broadcast data");
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, []);

  const filteredMessages = messages.filter((message) => {
    if (!pickupDate || !endDate) return true;
    const messageDate = new Date(message.date);
    const startDate = new Date(pickupDate);
    const end = new Date(endDate);
    return messageDate >= startDate && messageDate <= end;
  });

  const Handlethenavigation = (message) => {
    console.log("Clicked message:", message);
    if (message.label === "Failed") {
      navigate("/whatsappmarketing/Broadcast/BroadCastDetailsScreen");
    }
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setPeriod(value);
    const today = new Date();
    let startDate;

    switch (value) {
      case "one-week":
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case "one-month":
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case "three-months":
        startDate = new Date(today.setMonth(today.getMonth() - 3));
        break;
      default:
        startDate = null;
    }

    if (startDate) {
      setPickupDate(startDate.toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <div className="container mt-4" style={{backgroundColor:'#FFF8EF',padding:5}}>
      <div className="row align-items-center mb-4">
        <div className="col-md-4 mb-3">
          <div className="d-flex align-items-center">
            <label className="form-label mb-0" style={{ fontWeight: "bold", marginRight: "15px", fontSize: "1.1rem", width: "120px" }}>
              Pickup Date
            </label>
            <input
              type="date"
              className="form-control"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={{ border: "none", borderBottom: "2px solid #ccc", borderRadius: 0, maxWidth: "200px" }}
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex align-items-center">
            <label className="form-label mb-0" style={{ fontWeight: "bold", marginRight: "15px", fontSize: "1.1rem", width: "120px" }}>
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ border: "none", borderBottom: "2px solid #ccc", borderRadius: 0, maxWidth: "200px" }}
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex align-items-center">
            <label className="form-label mb-0" style={{ fontWeight: "bold", marginRight: "15px", fontSize: "1.1rem", width: "120px" }}>
              Period
            </label>
            <select
              className="form-select"
              value={period}
              onChange={handlePeriodChange}
              style={{ border: "none", borderBottom: "2px solid #ccc", borderRadius: 0, maxWidth: "200px" }}
            >
              <option value="one-week">One Week</option>
              <option value="one-month">One Month</option>
              <option value="three-months">Three Months</option>
            </select>
          </div>
        </div>
      </div>
      <h2 className="row g-3 justify-content-center">Outline Preview</h2>
      {loading ? (
        <div className="text-center">Loading broadcast data...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : messages.length === 0 ? (
        <div className="text-center">No broadcasts found</div>
      ) : (
        <div className="container" style={{ width: "70%", marginBottom: 30,backgroundColor:'#5FD568',padding:10,borderRadius:10 }}>
          {/* <h2 className="row g-3 justify-content-center">Outline Preview</h2> */}
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
                    cursor: "pointer",
                  }}
                  onClick={() => Handlethenavigation(message)}
                >
                  <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{message.count}</div>
                    <div
                      style={{
                        fontSize: "1rem",
                        backgroundColor: "#5FD568",
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
                  <p style={{ fontSize: "1rem", margin: 0, textAlign: "left", width: "100%" }}>{message.label}</p>
                </div>
              </div>
            ))}
          </div>
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
                  onClick={() => Handlethenavigation(message)}
                >
                  <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{message.count}</div>
                    <div
                      style={{
                        fontSize: "1rem",
                        backgroundColor: "#5FD568",
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
                  <p style={{ fontSize: "1rem", margin: 0, textAlign: "left", width: "100%" }}>{message.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BroadCast;