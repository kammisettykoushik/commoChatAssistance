import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmsSender = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 10;
  const token = localStorage.getItem("token");

  // Fetch campaigns from backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/smsmarketing/contactsms`,
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        ); // Adjust URL as needed
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreateCampaignClick = () => {
    navigate("/smsmarketing/Campaignsms");
  };

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Launched":
        return { backgroundColor: "#0ACF83", color: "white" };
      case "Failed":
        return { backgroundColor: "#FC4B45", color: "white" };
      default:
        return { backgroundColor: "transparent", color: "black" };
    }
  };

  const handleStatusClick = (status) => {
    if (status === "Failed") {
      navigate("/smsmarketing/FailedCampaigns");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading campaigns...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ backgroundColor: "#EAF6FE", padding: 5 }}>
      <div style={{ margin: "20px", backgroundColor: "white", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2>New Campaign</h2>
          <button
            onClick={handleCreateCampaignClick}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#0070C0",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Create Campaign
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th style={thStyle}>Campaign Name</th>
              <th style={thStyle}>Create Date</th>
              <th style={thStyle}>No of Contacts</th>
              <th style={thStyle}>Reached</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentCampaigns.map((campaign, index) => (
              <tr key={index}>
                <td style={tdStyle}>{campaign.campaignName}</td>
                <td style={tdStyle}>{campaign.sendDate}</td>
                <td style={tdStyle}>{campaign.contactsCount}</td>
                <td style={tdStyle}>{campaign.reached || "-"}</td>
                <td
                onClick={() => handleStatusClick(campaign.status)}
                style={{ ...tdStyle, cursor: "pointer" }}
                >
        <span style={{ padding: "2px 8px", ...getStatusStyles(campaign.status) }}>
          {campaign.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
        </table>

        {/* Pagination */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={paginationButtonStyle(currentPage === 1)}
          >
            Previous
          </button>
          <span style={{ marginRight: "10px" }}>Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * campaignsPerPage >= campaigns.length}
            style={paginationButtonStyle(currentPage * campaignsPerPage >= campaigns.length)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
  backgroundColor: "#f2f2f2",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const paginationButtonStyle = (disabled) => ({
  padding: "10px 20px",
  marginRight: "10px",
  backgroundColor: "#f1f1f1",
  border: "1px solid #ddd",
  cursor: disabled ? "not-allowed" : "pointer",
});

export default SmsSender;