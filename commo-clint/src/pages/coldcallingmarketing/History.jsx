import React, { useState } from "react";
import { Button, Dropdown, Modal, Table, ProgressBar, Pagination } from "react-bootstrap";
import { FaMicrophone } from "react-icons/fa";

const callHistory = [
    { id: 1, name: "John Doe", phone: "123-456-7890", calls: 5, status: "Connected", date: "2024-02-20", duration: "5m 30s", recorded: "Yes" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", calls: 3, status: "Not Connected", date: "2024-02-18", duration: "3m 10s", recorded: "No" },
    { id: 3, name: "Alice Johnson", phone: "456-789-0123", calls: 4, status: "Connected", date: "2024-02-17", duration: "4m 45s", recorded: "Yes" },
    { id: 4, name: "Bob Brown", phone: "321-654-9870", calls: 2, status: "Not Connected", date: "2024-02-16", duration: "2m 15s", recorded: "No" },
    { id: 5, name: "Charlie Green", phone: "159-753-4862", calls: 6, status: "Connected", date: "2024-02-15", duration: "6m 10s", recorded: "Yes" },
    { id: 6, name: "David Wilson", phone: "753-159-2846", calls: 1, status: "Not Connected", date: "2024-02-14", duration: "1m 30s", recorded: "No" },
    { id: 7, name: "Eve Adams", phone: "852-456-7890", calls: 3, status: "Connected", date: "2024-02-13", duration: "3m 50s", recorded: "Yes" },
    { id: 8, name: "Frank White", phone: "369-258-1470", calls: 2, status: "Not Connected", date: "2024-02-12", duration: "2m 45s", recorded: "No" },
    { id: 9, name: "Grace Kelly", phone: "741-852-9630", calls: 5, status: "Connected", date: "2024-02-11", duration: "5m 20s", recorded: "Yes" },
    { id: 10, name: "Henry Ford", phone: "123-321-1234", calls: 4, status: "Not Connected", date: "2024-02-10", duration: "4m 10s", recorded: "No" },
    { id: 11, name: "Isaac Newton", phone: "555-666-7777", calls: 2, status: "Connected", date: "2024-02-09", duration: "2m 40s", recorded: "Yes" },
    { id: 12, name: "Jack Black", phone: "777-888-9999", calls: 3, status: "Not Connected", date: "2024-02-08", duration: "3m 55s", recorded: "No" },
];

const History = () => {
    const [selectedCall, setSelectedCall] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

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
                <Button variant="success">Create Campaign</Button>
            </div>
            <table className="table table-bordered bg-dark">
                <thead className="bg-light">
                    <tr style={{ textAlign: 'center'}}>
                        <th style={{backgroundColor:'#8d78c4'}}>Name</th>
                        <th style={{backgroundColor:'#8d78c4'}}>Phone Number</th>
                        <th style={{backgroundColor:'#8d78c4'}}>Calls</th>
                        <th style={{backgroundColor:'#8d78c4'}}>Status</th>
                        <th style={{backgroundColor:'#8d78c4'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((call) => (
                        <tr key={call.id} className="text-center">
                            <td>{call.name}</td>
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
