import React, { useState } from "react";
import { Button, Table, Form, Pagination, Card } from "react-bootstrap";
import { FaPlus, FaCopy, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const campaignsData = [
    { id: 1, name: "Summer Sale", username: "Template1", date: "01 June 2025", status: "Active" },
    { id: 2, name: "Winter Deals", username: "Template2", date: "10 Dec 2025", status: "Expired" },
    { id: 3, name: "Black Friday", username: "Template3", date: "25 Nov 2025", status: "Active" },
    { id: 4, name: "Cyber Monday", username: "Template4", date: "28 Nov 2025", status: "Active" },
    { id: 5, name: "New Year Promo", username: "Template5", date: "31 Dec 2025", status: "Expired" },
    { id: 6, name: "Spring Discount", username: "Template6", date: "15 Mar 2025", status: "Active" },
    { id: 7, name: "Easter Special", username: "Template7", date: "10 Apr 2025", status: "Active" },
    { id: 8, name: "Back to School", username: "Template8", date: "01 Sep 2025", status: "Expired" },
    { id: 9, name: "Halloween Treats", username: "Template9", date: "31 Oct 2025", status: "Active" },
    { id: 10, name: "Thanksgiving Giveaway", username: "Template10", date: "24 Nov 2025", status: "Expired" },
    { id: 11, name: "Valentine's Offer", username: "Template11", date: "14 Feb 2025", status: "Active" },
    { id: 12, name: "Independence Day", username: "Template12", date: "04 Jul 2025", status: "Expired" },
    { id: 13, name: "Christmas Specials", username: "Template13", date: "25 Dec 2025", status: "Active" },
    { id: 14, name: "Mega Anniversary Sale", username: "Template14", date: "15 Aug 2025", status: "Expired" },
    { id: 15, name: "Flash Deals", username: "Template15", date: "05 May 2025", status: "Active" },
    { id: 16, name: "Exclusive Members Sale", username: "Template16", date: "20 Oct 2025", status: "Active" },
    { id: 17, name: "Father's Day Discount", username: "Template17", date: "16 Jun 2025", status: "Expired" },
    { id: 18, name: "Mother's Day Offer", username: "Template18", date: "12 May 2025", status: "Active" },
    { id: 19, name: "Weekend Special", username: "Template19", date: "22 Jun 2025", status: "Active" },
    { id: 20, name: "Daily Flash Sale", username: "Template20", date: "02 Jul 2025", status: "Expired" }
];

const Campaigns = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [campaigns, setCampaigns] = useState(campaignsData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const handleCreateNewCampaign = () => {
        navigate("/EmailMarketing/Campaigns/NewCampaign");
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied: " + text);
    };

    const handleDelete = (id) => {
        setCampaigns(campaigns.filter(c => c.id !== id));
    };

    const filteredCampaigns = campaigns.filter(c => 
        (filter === "all" || c.status.toLowerCase() === filter) && 
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const displayedCampaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Campaigns</h2>
                <Button variant="primary" onClick={handleCreateNewCampaign}>
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
                                <th className="text-center" style={{ width: "15%" }}>Date</th>
                                <th className="text-center" style={{ width: "40%" }}>Name</th>
                                <th className="text-center" style={{ width: "20%" }}>Last Modified</th>
                                <th className="text-center" style={{ width: "25%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCampaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td className="text-center">{campaign.date}</td>
                                    <td className="text-center">{campaign.name}</td>
                                    <td className="text-center">3 min ago</td>
                                    <td className="text-center">
                                        {campaign.status} 
                                        <FaCopy 
                                            className="ms-2 text-primary" 
                                            onClick={() => handleCopy(campaign.status)} 
                                            style={{ cursor: "pointer" }} 
                                        />  | 
                                        <FaTrash 
                                            className="ms-2 text-danger" 
                                            onClick={() => handleDelete(campaign.id)} 
                                            style={{ cursor: "pointer" }} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
            <Pagination className="justify-content-center mt-3">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default Campaigns;
