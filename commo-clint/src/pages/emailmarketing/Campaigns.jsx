// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const campaignsData = [
//   { id: 1, name: "Product Launched Campaign", username: "User1", time: "2 hours ago", status: "active", sent: 20, opened: 15, failed: 5 },
//   { id: 2, name: "Product Launched Campaign", username: "User2", time: "5 hours ago", status: "expired", sent: 30, opened: 20, failed: 10 },
//   { id: 3, name: "Product Launched Campaign", username: "User3", time: "1 day ago", status: "active", sent: 25, opened: 18, failed: 7 },
//   { id: 4, name: "Product Launched Campaign", username: "User4", time: "3 days ago", status: "expired", sent: 15, opened: 10, failed: 5 },
//   { id: 5, name: "Product Launched Campaign", username: "User5", time: "5 days ago", status: "active", sent: 40, opened: 30, failed: 10 },
//   { id: 6, name: "Product Launched Campaign", username: "User6", time: "1 week ago", status: "active", sent: 35, opened: 25, failed: 10 },
//   { id: 7, name: "Product Launched Campaign", username: "User7", time: "2 weeks ago", status: "expired", sent: 10, opened: 5, failed: 5 },
//   { id: 8, name: "Product Launched Campaign", username: "User8", time: "3 weeks ago", status: "active", sent: 22, opened: 16, failed: 6 },
//   { id: 9, name: "Product Launched Campaign", username: "User9", time: "1 month ago", status: "expired", sent: 18, opened: 12, failed: 6 },
//   { id: 10, name: "Product Launched Campaign", username: "User10", time: "2 months ago", status: "active", sent: 28, opened: 20, failed: 8 },
//   { id: 11, name: "Product Launched Campaign", username: "User11", time: "3 months ago", status: "active", sent: 32, opened: 22, failed: 10 },
//   { id: 12, name: "Product Launched Campaign", username: "User12", time: "4 months ago", status: "expired", sent: 24, opened: 16, failed: 8 },
//   { id: 13, name: "Product Launched Campaign", username: "User13", time: "5 months ago", status: "active", sent: 50, opened: 40, failed: 10 },
//   { id: 14, name: "Product Launched Campaign", username: "User14", time: "6 months ago", status: "expired", sent: 20, opened: 10, failed: 10 },
//   { id: 15, name: "Product Launched Campaign", username: "User15", time: "7 months ago", status: "active", sent: 45, opened: 30, failed: 15 }
// ];




// const Campaigns = () => {
// const navigate = useNavigate();
//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const filteredCampaigns = filter === "all" ? campaignsData : campaignsData.filter(c => c.status === filter);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

//   const handleCreateNewCampaign = () => {
//     navigate('/EmailMarketing/Campaigns/NewCampaign');
//   };

//   return (
//     <div className="container mt-4 mb-4">
//       <h2 className="ml-4 mb-4">Campaigns</h2>
//       <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
//         <div className="nav nav-tabs">
//           <button className={`nav-link ${filter === "all" ? "active" : ""}`} onClick={() => { setFilter("all"); setCurrentPage(1); }}>All campaigns</button>
//           <button className={`nav-link ${filter === "active" ? "active" : ""}`} onClick={() => { setFilter("active"); setCurrentPage(1); }}>Active</button>
//           <button className={`nav-link ${filter === "expired" ? "active" : ""}`} onClick={() => { setFilter("expired"); setCurrentPage(1); }}>Expired</button>
//         </div>
//         <Button variant="success" className="mb-4" onClick={handleCreateNewCampaign}>
//           <FaPlus /> New Campaign
//         </Button>
//       </div>

//       <div className="list-group">
//         {currentItems.map((campaign) => (
//                     <div key={campaign.id} className="list-group-item d-flex align-items-center justify-content-between border p-3">
//             <div className="d-flex align-items-center">
//               <img src="https://storage.needpix.com/rsynced_images/head-659651_1280.png" alt="Product" className="me-3" style={{ width: 50, height: 50 }} />
//               <div>
//                 <h5 className="mb-0">{campaign.name}</h5>
//                 <small className="text-muted">{campaign.username} - {campaign.time}</small>
//               </div>
//             </div>
//             <div className="d-flex gap-5">
//               <div className="d-flex flex-column text-center me-3">
//                 <span className="text-muted">Sent</span>
//                 <strong>{campaign.sent}</strong>
//               </div>
//               <div className="d-flex flex-column text-center me-3">
//                 <span className="text-muted">Opened</span>
//                 <strong>{campaign.opened}</strong>
//               </div>
//               <div className="d-flex flex-column text-center">
//                 <span className="text-muted">Failed</span>
//                 <strong>{campaign.failed}</strong>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Pagination Controls */}
//       <div className="d-flex justify-content-center mt-3">
//         <Button variant="secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </Button>
//         <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
//         <Button variant="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Campaigns;
