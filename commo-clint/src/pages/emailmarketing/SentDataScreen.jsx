import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SentDataScreen = () => {
    const sentData = [
        { count: 1, name: "John Doe", email: "john.doe@example.com", status: "Delivered", dateSent: "2024-02-20" },
        { count: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Delivered", dateSent: "2024-02-19" },
        { count: 3, name: "Alice Brown", email: "alice.brown@example.com", status: "Delivered", dateSent: "2024-02-18" },
        { count: 4, name: "Robert White", email: "robert.white@example.com", status: "Delivered", dateSent: "2024-02-17" },
        { count: 5, name: "Emily Davis", email: "emily.davis@example.com", status: "Delivered", dateSent: "2024-02-16" },
        { count: 6, name: "Michael Wilson", email: "michael.wilson@example.com", status: "Delivered", dateSent: "2024-02-15" },
        { count: 7, name: "Sarah Johnson", email: "sarah.johnson@example.com", status: "Delivered", dateSent: "2024-02-14" },
        { count: 8, name: "David Anderson", email: "david.anderson@example.com", status: "Delivered", dateSent: "2024-02-13" },
        { count: 9, name: "Laura Martinez", email: "laura.martinez@example.com", status: "Delivered", dateSent: "2024-02-12" },
        { count: 10, name: "James Thomas", email: "james.thomas@example.com", status: "Delivered", dateSent: "2024-02-11" },
        { count: 6, name: "Michael Wilson", email: "michael.wilson@example.com", status: "Delivered", dateSent: "2024-02-15" },
        { count: 7, name: "Sarah Johnson", email: "sarah.johnson@example.com", status: "Delivered", dateSent: "2024-02-14" },
        { count: 8, name: "David Anderson", email: "david.anderson@example.com", status: "Delivered", dateSent: "2024-02-13" },
        { count: 9, name: "Laura Martinez", email: "laura.martinez@example.com", status: "Delivered", dateSent: "2024-02-12" },
        { count: 10, name: "James Thomas", email: "james.thomas@example.com", status: "Delivered", dateSent: "2024-02-11" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(sentData.length / pageSize);
    
    const currentData = sentData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Sent Data</h2>

            <div className="table-responsive d-flex justify-content-center">
                <table className="table table-bordered text-center w-75">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Sent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.count}>
                                <td>{item.count}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.dateSent}</td>
                                <td>✅ Delivered</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                            Previous
                        </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SentDataScreen;
