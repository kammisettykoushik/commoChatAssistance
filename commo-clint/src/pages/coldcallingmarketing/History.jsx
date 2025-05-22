import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dropdown, Modal, Table, ProgressBar, Pagination } from "react-bootstrap";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [callHistory, setCallHistory] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCallHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/coldcallingmarketing/campaignscreens");
                console.log("API Data:", response.data);
                setCallHistory(response.data);
            } catch (error) {
                console.error("Error fetching call history:", error);
            }
        };
    
        fetchCallHistory();
    }, []);

    const handleViewDetails = (call) => {
        setSelectedCall(call);
        setShowModal(true);
    };

    // Pagination Logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = callHistory.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(callHistory.length / recordsPerPage);

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-xl font-bold">Call History</h2>
                <Button variant="success" onClick={() => navigate("/Coldcallingmarketing/CampaignsScreen")}>
                    Create Campaign
                </Button>
            </div>
            <table className="table table-bordered bg-dark">
                <thead className="bg-light">
                    <tr style={{ textAlign: 'center' }}>
                        <th style={{ backgroundColor: '#8d78c4' }}>Campaign Name</th>
                        <th style={{ backgroundColor: '#8d78c4' }}>Phone Number</th>
                        <th style={{ backgroundColor: '#8d78c4' }}>Calls</th>
                        <th style={{ backgroundColor: '#8d78c4' }}>Status</th>
                        <th style={{ backgroundColor: '#8d78c4' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((call) => (
                        <tr key={call.id} className="text-center">
                            <td>{call.campaignName}</td>
                            <td>{call.phone}</td>
                            <td>{call.calls}</td>
                            <td className={call.status === "Connected" ? "text-success" : "text-danger"}>{call.status}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-primary">View</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleViewDetails(call)}>View Details</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <Pagination className="justify-content-center">
                <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                <Pagination.Item>{currentPage}</Pagination.Item>
                <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
            </Pagination>

            {/* Modal for Call Details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Call Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCall && (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>Call Recorded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{selectedCall.date}</td>
                                        <td>{selectedCall.duration}</td>
                                        <td>
                                            {selectedCall.recorded === "Yes" ? (
                                                <div className="d-flex align-items-center">
                                                    <ProgressBar now={70} variant="success" style={{ width: "80%" }} />
                                                    <FaMicrophone className="ms-2 text-primary" size={20} />
                                                </div>
                                            ) : (
                                                "No Recording"
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default History;
