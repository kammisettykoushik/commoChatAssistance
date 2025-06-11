import React, { useState, useEffect } from "react";
import { Button, Table, Form, Pagination, Card } from "react-bootstrap";
import { FaPlus, FaCopy, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Campaigns = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState(""); // Search state
    const [campaigns, setCampaigns] = useState([]); // Empty array for backend data
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const token = localStorage.getItem("token");

    // Fetch campaigns from the backend API
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
                setCampaigns(response.data || []); // Fallback to empty array
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };
        fetchCampaigns();
    }, []);

    const handleCreateNewCampaign = () => {
        navigate("/EmailMarketing/Campaigns/NewCampaign");
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied: " + text);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns/${id}`,
                {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
            );
            setCampaigns(campaigns.filter(campaign => campaign.id !== id)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting campaign:", error);
            alert("Failed to delete campaign");
        }
    };

    // Filter campaigns by search term
    const filteredCampaigns = campaigns.filter(campaign => 
        campaign.campaignName.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const displayedCampaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Campaigns</h2>
                <Button onClick={handleCreateNewCampaign} style={{backgroundColor:'#032D60'}}>
                    <FaPlus /> Create Campaign
                </Button>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    {['all', 'active', 'expired'].map(status => (
                        <button 
                            key={status}
                            className={`btn mx-1 ${filter === status ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
                {/* Search Input Field */}
                <Form.Control 
                    type="text" 
                    placeholder="Search..." 
                    className="w-25" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped hover responsive="sm">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ width: "15%",backgroundColor:'#FDEE96'}}>Date</th>
                                <th className="text-center" style={{ width: "40%" ,backgroundColor:'#FDEE96'}}>Name</th>
                                <th className="text-center" style={{ width: "20%",backgroundColor:'#FDEE96' }}>Last Modified</th>
                                <th className="text-center" style={{ width: "25%",backgroundColor:'#FDEE96' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCampaigns.length > 0 ? (
                                displayedCampaigns.map((campaign) => (
                                    <tr key={campaign.id}>
                                        <td className="text-center">{campaign.timestamp}</td> {/* Use timestamp from backend */}
                                        <td className="text-center">{campaign.campaignName}</td> {/* Use campaignName from backend */}
                                        <td className="text-center">3 min ago</td> {/* Placeholder for last modified */}
                                        <td className="text-center">
                                            <FaCopy 
                                                className="ms-2 text-primary" 
                                                onClick={() => handleCopy(campaign.campaignName)} 
                                                style={{ cursor: "pointer" }} 
                                            />  | 
                                            <FaTrash 
                                                className="ms-2 text-danger" 
                                                onClick={() => handleDelete(campaign.id)} 
                                                style={{ cursor: "pointer" }} 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No campaigns available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
            <Pagination className="justify-content-center mt-3">
                <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1} 
                />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item 
                        key={i + 1} 
                        active={i + 1 === currentPage} 
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages} 
                />
            </Pagination>
        </div>
    );
};

export default Campaigns;