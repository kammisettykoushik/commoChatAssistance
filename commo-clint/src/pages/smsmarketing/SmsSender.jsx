import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SmsSender = () => {
  const navigate = useNavigate();
  const handleCreateCampaignClick = () => {
    // Navigate to /create-campaign route when button is clicked
    navigate("/smsmarketing/Campaignsms");
  };

  // Sample data
  const campaigns = [
    { name: "Campaign 1", createDate: "2025-03-18", contacts: 500, reached: 450, status: "Launched" },
    { name: "Campaign 2", createDate: "2025-03-17", contacts: 800, reached: 600, status: "Failed" },
    { name: "Campaign 3", createDate: "2025-03-16", contacts: 1000, reached: 950, status: "Launched" },
    { name: "Campaign 4", createDate: "2025-03-15", contacts: 200, reached: 150, status: "Failed" },
    { name: "Campaign 5", createDate: "2025-03-14", contacts: 1200, reached: 1100, status: "Launched" },
    { name: "Campaign 6", createDate: "2025-03-13", contacts: 500, reached: 450, status: "Failed" },
    { name: "Campaign 7", createDate: "2025-03-12", contacts: 1500, reached: 1400, status: "Launched" },
    { name: "Campaign 8", createDate: "2025-03-11", contacts: 200, reached: 150, status: "Failed" },
    { name: "Campaign 9", createDate: "2025-03-10", contacts: 100, reached: 90, status: "Launched" },
    { name: "Campaign 10", createDate: "2025-03-09", contacts: 500, reached: 450, status: "Failed" },
    { name: "Campaign 11", createDate: "2025-03-08", contacts: 800, reached: 700, status: "Launched" },
    { name: "Campaign 12", createDate: "2025-03-07", contacts: 200, reached: 150, status: "Failed" },
    { name: "Campaign 13", createDate: "2025-03-06", contacts: 500, reached: 450, status: "Launched" },
    { name: "Campaign 14", createDate: "2025-03-05", contacts: 800, reached: 650, status: "Failed" },
    { name: "Campaign 15", createDate: "2025-03-04", contacts: 1200, reached: 1150, status: "Launched" },
    { name: "Campaign 16", createDate: "2025-03-03", contacts: 1000, reached: 900, status: "Failed" },
    { name: "Campaign 17", createDate: "2025-03-02", contacts: 200, reached: 150, status: "Launched" },
    { name: "Campaign 18", createDate: "2025-03-01", contacts: 500, reached: 450, status: "Failed" },
    { name: "Campaign 19", createDate: "2025-02-28", contacts: 700, reached: 600, status: "Launched" },
    { name: "Campaign 20", createDate: "2025-02-27", contacts: 300, reached: 200, status: "Failed" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 10;

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Launched":
        return {
          backgroundColor: "#0ACF83",
          color: "white",
        };
      case "Failed":
        return {
          backgroundColor: "#FC4B45",
          color: "white",
        };
      default:
        return {
          backgroundColor: "transparent",
          color: "black",
        };
    }
  };

  const handleStatusClick = (status) => {
    if (status === "Failed") {
      // Navigate to a different screen if status is "Failed"
      navigate("/smsmarketing/FailedCampaigns");  // Adjust the route as needed
    }
  };

  return (
    <div style={{ backgroundColor: '#EAF6FE', padding: 5 }}>
    <div style={{ margin: "20px",backgroundColor:'white',padding:20 }}>
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
            <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Campaign Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Create Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>No of Contacts</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Reached</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentCampaigns.map((campaign, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                {campaign.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                {campaign.createDate}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                {campaign.contacts}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                {campaign.reached}
              </td>
              <td
                onClick={() => handleStatusClick(campaign.status)}
                style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center", cursor: 'pointer' }}
              >
                <span
                  style={{
                    padding: "2px 8px",
                    backgroundColor: getStatusStyles(campaign.status).backgroundColor,
                    color: getStatusStyles(campaign.status).color,
                  }}
                >
                  {campaign.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#f1f1f1",
            border: "1px solid #ddd",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ marginRight: "10px" }}>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * campaignsPerPage >= campaigns.length}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f1f1f1",
            border: "1px solid #ddd",
            cursor: currentPage * campaignsPerPage >= campaigns.length ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default SmsSender;
