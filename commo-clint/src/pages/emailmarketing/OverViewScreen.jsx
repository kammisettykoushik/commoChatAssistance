import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const failedData = Array.from({ length: 20 }, (_, index) => ({
    count: index + 1,
    name: `Failed Item ${index + 1}`,
    reason: `Failure reason ${index + 1}`,
}));

const OverViewScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(failedData.length / pageSize);

    const currentData = failedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Failed Data</h2>

            <div className="table-responsive d-flex justify-content-center">
                <table className="table table-bordered text-center w-75">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.count}>
                                <td>{item.count}</td>
                                <td>{item.name}</td>
                                <td>{item.reason}</td>
                                <td>❌</td>
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

export default OverViewScreen;
