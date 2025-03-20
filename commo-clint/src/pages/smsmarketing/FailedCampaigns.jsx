// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";  // Importing the cross icon from react-icons

// const FailedCampaigns = () => {
//   // Sample data for failed campaigns
//   const failedCampaigns = [
//     { name: "Campaign 2", contacts: 800, reason: "Invalid phone numbers" },
//     { name: "Campaign 4", contacts: 200, reason: "Network failure" },
//     { name: "Campaign 6", contacts: 500, reason: "Message failed to send" },
//     { name: "Campaign 8", contacts: 200, reason: "Insufficient balance" },
//     { name: "Campaign 10", contacts: 500, reason: "Invalid contacts list" },
//     { name: "Campaign 12", contacts: 200, reason: "Server timeout" },
//     { name: "Campaign 14", contacts: 800, reason: "API failure" },
//     { name: "Campaign 16", contacts: 1000, reason: "System error" },
//     { name: "Campaign 18", contacts: 500, reason: "Message format error" },
//     { name: "Campaign 20", contacts: 300, reason: "Failed to reach recipients" },
//     { name: "Campaign 21", contacts: 400, reason: "SMS delivery failure" },
//     { name: "Campaign 22", contacts: 1200, reason: "Campaign misconfigured" },
//     { name: "Campaign 23", contacts: 800, reason: "Permission denied" },
//     { name: "Campaign 24", contacts: 900, reason: "Unknown issue" },
//     { name: "Campaign 25", contacts: 300, reason: "Data mismatch" },
//     { name: "Campaign 26", contacts: 600, reason: "Network congestion" },
//     { name: "Campaign 27", contacts: 500, reason: "Recipient blocked" },
//     { name: "Campaign 28", contacts: 700, reason: "Message content blocked" },
//     { name: "Campaign 29", contacts: 100, reason: "API rate limit exceeded" },
//     { name: "Campaign 30", contacts: 600, reason: "Unknown recipient error" },
//   ];

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const campaignsPerPage = 10;

//   const indexOfLastCampaign = currentPage * campaignsPerPage;
//   const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
//   const currentFailedCampaigns = failedCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleRemoveCampaign = (campaignName) => {
//     alert(`Removing campaign: ${campaignName}`);  // You can replace this with actual remove functionality
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px' }}>
//   <button
//     style={{
//       backgroundColor: "#0070C0",
//       color: "white",
//       width: "100px",
//       border: "none",
//       padding: "5px",
//     }}
//   >
//     Check
//   </button>
// </div>


//       <div style={{ backgroundColor: "white", padding: "10px", marginTop: "10px" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
//           <thead>
//             <tr>
//               <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Campaign Name</th>
//               <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Contacts</th>
//               <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Failed</th>
//               <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>Reason</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentFailedCampaigns.map((campaign, index) => (
//               <tr key={index}>
//                 <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
//                   {campaign.name}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
//                   {campaign.contacts}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center", cursor: "pointer" }}>
//                   <FaTimes
//                     onClick={() => handleRemoveCampaign(campaign.name)}
//                     style={{ color: "red", fontSize: "20px" }}
//                   />
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
//                   {campaign.reason}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination Section */}
//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               padding: "10px 20px",
//               marginRight: "10px",
//               backgroundColor: "#f1f1f1",
//               border: "1px solid #ddd",
//               cursor: currentPage === 1 ? "not-allowed" : "pointer",
//             }}
//           >
//             Previous
//           </button>
//           <span style={{ marginRight: "10px" }}>Page {currentPage}</span>
//           <button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage * campaignsPerPage >= failedCampaigns.length}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#f1f1f1",
//               border: "1px solid #ddd",
//               cursor: currentPage * campaignsPerPage >= failedCampaigns.length ? "not-allowed" : "pointer",
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailedCampaigns;
