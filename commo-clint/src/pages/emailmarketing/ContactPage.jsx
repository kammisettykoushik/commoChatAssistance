import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch campaigns from the API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns`,
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  // Navigate to the campaign contacts screen
  const handleCampaignClick = (campaignId) => {
    navigate(`/campaigns/${campaignId}/contacts`);
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Campaigns</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.campaignName}</td>
              <td>
                <Button variant="primary" onClick={() => handleCampaignClick(campaign.id)}>
                  View Contacts
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CampaignList;