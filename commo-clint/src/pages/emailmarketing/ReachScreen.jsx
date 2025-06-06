import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const reachData = [
    { count: 1, name: "John Doe", engagement: "High", status: "✅" },
    { count: 2, name: "Jane Smith", engagement: "Medium", status: "✅" },
    { count: 3, name: "Michael Johnson", engagement: "Low", status: "⚠️" },
    { count: 4, name: "Emily Davis", engagement: "High", status: "✅" },
    { count: 5, name: "David Brown", engagement: "Medium", status: "✅" },
    { count: 6, name: "Sarah Wilson", engagement: "Low", status: "⚠️" },
    { count: 7, name: "James Anderson", engagement: "High", status: "✅" },
    { count: 8, name: "Emma Thomas", engagement: "Medium", status: "✅" },
    { count: 9, name: "Olivia Martinez", engagement: "Low", status: "⚠️" },
    { count: 10, name: "William Taylor", engagement: "High", status: "✅" },
    { count: 11, name: "Sophia Harris", engagement: "Medium", status: "✅" },
    { count: 12, name: "Mason Clark", engagement: "Low", status: "⚠️" }
];

const ReachScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(reachData.length / pageSize);

    const currentData = reachData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Reach Data</h2>

            <div className="table-responsive d-flex justify-content-center">
                <table className="table table-bordered text-center w-75">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Engagement Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.count}>
                                <td>{item.count}</td>
                                <td>{item.name}</td>
                                <td>{item.engagement}</td>
                                <td>{item.status}</td>
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

export default ReachScreen;
