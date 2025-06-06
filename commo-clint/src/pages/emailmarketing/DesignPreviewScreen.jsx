import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";


const CampaignCard = ({ campaign, onDelete }) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{campaign.campaignName}</h5>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(campaign.id)}>
            <FaTrashAlt />
          </button>
        </div>
        <p className="card-text text-muted small mb-2">
          <strong>From:</strong> {campaign.owners}
        </p>
        <h6 className="card-subtitle mb-2">{campaign.subject}</h6>

        {campaign.mediaUrl && (
          <div className="mb-3">
            <img
              src={campaign.mediaUrl}
              alt="Preview"
              className="img-fluid rounded"
            />
          </div>
        )}

        <div className="card-text small mb-3">
          <strong>File:</strong> {campaign.contactsUrl ? campaign.contactsUrl.split('/').pop() : 'No file uploaded'}
        </div>

        <div className="card-text small mb-3">
          <strong>Content:</strong> {campaign.content}
        </div>

        <div className="card-text small mb-3">
          <strong>Headers:</strong> {campaign.header || 'No headers'}
        </div>

        <div className="card-text small">
          <strong>Footer:</strong> {campaign.footer || 'No footer provided'}
        </div>
      </div>
    </div>
  );
};

const DesignPreviewScreen = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

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
      setLoading(false);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Failed to load campaigns");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    } catch (err) {
      console.error("Error deleting campaign:", err);
      alert("Failed to delete campaign");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOverview = () => {
    navigate("/EmailMarketing/Overview");
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-4">
      

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-4 align-items-center">
          <button className="btn" onClick={handleBack}>
            <ArrowRight2 size="32" color="blue" variant="Bold" />
          </button>
          <h4 className="fw-bold">Campaign Preview</h4>
        </div>
        <div className="">
        <input
          type="text"
          className="form-control"
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <button
          className="fw-bold ml-auto bg-success border p-2 rounded text-white"
          onClick={handleOverview}
        >
          See the Overview
        </button>
      </div>

      

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading campaigns...</p>
        </div>
      ) : error ? (
        <div className="text-center mt-5">
          <p className="text-danger">{error}. Please try again later.</p>
          <button className="btn btn-primary" onClick={fetchCampaigns}>
            Retry
          </button>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="/path/to/illustration.svg"
            alt="No campaigns"
            className="img-fluid mb-3"
            style={{ maxWidth: '200px' }}
          />
          <p className="text-muted">No campaigns available. Please create a new campaign.</p>
          <button className="btn btn-primary" onClick={() => navigate("/EmailMarketing/Campaigns/DesignCampaign")}>
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="col">
              <CampaignCard campaign={campaign} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignPreviewScreen;