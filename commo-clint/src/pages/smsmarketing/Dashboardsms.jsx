// import React, { useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { FaUsers, FaSms, FaFileAlt } from 'react-icons/fa'; // Simple icons for the cards
// import { Profile2User, Send2, Receive } from "iconsax-react";

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashboardsms = () => {
//     const [selectedFilter, setSelectedFilter] = useState("Monthly");

//     // Data for the bar chart
//     const monthlyData = {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//         datasets: [
//             {
//                 label: "SMS Sent",
//                 data: [1500, 1800, 2000, 2200, 2500, 2700, 3000, 3500, 4000, 4500, 5000, 5500],
//                 backgroundColor: "#0131AD", // Updated to blue color
//                 borderColor: "#0131AD", // Updated to blue color
//                 borderWidth: 1,
//                 borderRadius: 10,  // Rounded corners for bars
//             },
//             {
//                 label: "SMS Delivered",
//                 data: [1200, 1600, 1800, 2000, 2300, 2500, 2700, 3000, 3500, 4000, 4300, 4600],
//                 backgroundColor: "#B2DDFC", // Updated to light blue color
//                 borderColor: "#B2DDFC", // Updated to light blue color
//                 borderWidth: 1,
//                 borderRadius: 10,  // Rounded corners for bars
//             },
//         ],
//     };

//     // Yearly data example (you can adjust based on real data)
//     const yearlyData = {
//         labels: ["2021", "2022", "2023"],
//         datasets: [
//             {
//                 label: "SMS Sent",
//                 data: [36000, 40000, 46000],
//                 backgroundColor: "#0131AD", // Updated to blue color
//                 borderColor: "#0131AD", // Updated to blue color
//                 borderWidth: 1,
//                 borderRadius: 10,
//             },
//             {
//                 label: "SMS Delivered",
//                 data: [32000, 38000, 44000],
//                 backgroundColor: "#B2DDFC", // Updated to light blue color
//                 borderColor: "#B2DDFC", // Updated to light blue color
//                 borderWidth: 1,
//                 borderRadius: 10,
//             },
//         ],
//     };

//     // Select data based on the filter (Monthly or Yearly)
//     const data = selectedFilter === "Monthly" ? monthlyData : yearlyData;

//     // Options for the bar chart
//     const options = {
//         responsive: true,
//         scales: {
//             x: {
//                 beginAtZero: true,
//                 grid: {
//                     display: false,  // Remove vertical grid lines
//                 },
//                 categoryPercentage: 0.7,  // Increase the space between bars
//                 barPercentage: 0.7,  // Bar width adjustment
//             },
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     callback: function (value) {
//                         // Custom Y-axis labels like 1K, 5K, 10K
//                         if (value >= 1000) {
//                             return value / 1000 + "K";
//                         }
//                         return value;
//                     },
//                 },
//                 grid: {
//                     color: '#ddd',  // Light gray color for horizontal grid lines
//                     lineWidth: 1,  // Thin horizontal grid lines
//                 },
//             },
//         },
//         plugins: {
//             legend: {
//                 position: "top",
//             },
//             tooltip: {
//                 mode: "index",
//                 intersect: false,
//             },
//         },
//     };

//     return (
//         <div style={{ padding: 20, backgroundColor: '#EAF6FE' }}>
//             <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "20px" }}>
//                 <div style={boxStyle}>
//                     {/* <FaUsers size={30} style={{ color: "#007bff", marginBottom: "10px" }} /> */}
//                     <span style={{ display: 'flex', marginLeft: 5 }}>
//                         <h4>Total Contacts</h4>
//                         <Profile2User size="35" color="red" style={{ marginLeft: 20, backgroundColor: 'white', borderRadius: 50, padding: 10 }} />

//                     </span>
//                     <div style={{ fontSize: "24px", fontWeight: "bold", fontSize: 30 }}>1544</div>
//                     <div style={{ color: "#80B7DF", fontSize: "14px", textAlign: "Right" }}>+35%</div>
//                 </div>
//                 <div style={boxStyle}>
//                     {/* <FaUsers size={30} style={{ color: "#007bff", marginBottom: "10px" }} /> */}
//                     <span style={{ display: 'flex', marginLeft: 25 }}>
//                         <h4>SMS Sent</h4>
//                         <Send2 size="35" color="red" style={{ marginLeft: 20, backgroundColor: 'white', borderRadius: 50, padding: 10 }} />

//                     </span>
//                     <div style={{ fontSize: "24px", fontWeight: "bold", fontSize: 30 }}>3255</div>
//                     <div style={{ color: "#80B7DF", fontSize: "14px", textAlign: "Right" }}>+35%</div>
//                 </div>
//                 <div style={boxStyle}>
//                     {/* <FaUsers size={30} style={{ color: "#007bff", marginBottom: "10px" }} /> */}
//                     <span style={{ display: 'flex', marginLeft: 10 }}>
//                         <h4>SMS Received</h4>
//                         <Receive size="35" color="red" style={{ marginLeft: 20, backgroundColor: 'white', borderRadius: 50, padding: 10 }} />

//                     </span>
//                     <div style={{ fontSize: "24px", fontWeight: "bold", fontSize: 30 }}>674</div>
//                     <div style={{ color: "#80B7DF", fontSize: "14px", textAlign: "Right" }}>+35%</div>
//                 </div>
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

//                 <div style={{ width: '80%', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
//                     {/* Dashboard Boxes */}


//                     {/* SMS Sent Report Section */}
//                     <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                             <div>
//                                 <h2>SMS Sent Report</h2>
//                                 <p>You can filter by Monthly or Yearly</p>
//                             </div>
//                             <div style={{ display: "flex", alignItems: "center" }}>
//                                 <select
//                                     value={selectedFilter}
//                                     onChange={(e) => setSelectedFilter(e.target.value)}
//                                     style={selectStyle}
//                                 >
//                                     <option value="Monthly">Filter</option>
//                                     <option value="Monthly">Monthly</option>
//                                     <option value="Yearly">Yearly</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div style={{ marginTop: "20px", height: "350px", borderRadius: "8px", border: "2px solid #0131AD", backgroundColor: "white" }}>
//                             <Bar data={data} options={options} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Box style with a blue border, white background, and padding of 10px
// const boxStyle = {
//     width: 250,
//     padding: "10px",
//     height: 'auto',
//     color: 'white',
//     borderRadius: "8px",
//     backgroundColor: "#0070C0",
//     //   border: "2px solid blue", // Blue border
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     textAlign: "center",
// };

// const selectStyle = {
//     padding: "5px",
//     fontSize: "14px",
//     marginRight: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     backgroundColor: '#0070C0',
//     color: 'white',
// };

// export default Dashboardsms;
