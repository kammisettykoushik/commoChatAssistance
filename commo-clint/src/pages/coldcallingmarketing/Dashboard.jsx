// import React, { useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from "recharts";
// import { Dropdown } from "react-bootstrap";
// import { FaPhone, FaCheckCircle, FaEnvelopeOpen, FaTimesCircle } from "react-icons/fa";
// // Bar chart data from Jan to Dec
// const barData = [
//   { name: "Jan", value: 30, delivered: 200, read: 20, dateRange: "01/01/2025 - 01/31/2025" },
//   { name: "Feb", value: 45, delivered: 300, read: 50, dateRange: "02/01/2025 - 02/28/2025" },
//   { name: "Mar", value: 60, delivered: 400, read: 60, dateRange: "03/01/2025 - 03/31/2025" },
//   { name: "Apr", value: 80, delivered: 250, read: 30, dateRange: "04/01/2025 - 04/30/2025" },
//   { name: "May", value: 55, delivered: 220, read: 40, dateRange: "05/01/2025 - 05/31/2025" },
//   { name: "Jun", value: 70, delivered: 280, read: 35, dateRange: "06/01/2025 - 06/30/2025" },
//   { name: "Jul", value: 50, delivered: 250, read: 30, dateRange: "07/01/2025 - 07/31/2025" },
//   { name: "Aug", value: 75, delivered: 330, read: 40, dateRange: "08/01/2025 - 08/31/2025" },
//   { name: "Sep", value: 85, delivered: 370, read: 50, dateRange: "09/01/2025 - 09/30/2025" },
//   { name: "Oct", value: 65, delivered: 290, read: 45, dateRange: "10/01/2025 - 10/31/2025" },
//   { name: "Nov", value: 40, delivered: 200, read: 25, dateRange: "11/01/2025 - 11/30/2025" },
//   { name: "Dec", value: 90, delivered: 400, read: 60, dateRange: "12/01/2025 - 12/31/2025" }
// ];

// // Pie chart data
// const pieData = [
//   { name: "Connected", value: 50, color: "#c84cd9" },
//   { name: "Itrested", value: 25, color: "#181b6e" },
//   { name: "Not connected", value: 25, color: "#4c97d9" }
// ];

// const Dashboard = () => {
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [filteredBarData, setFilteredBarData] = useState(barData);
//   const [hoveredData, setHoveredData] = useState(null);
//   const [hoveredPosition, setHoveredPosition] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // Handle filter change
//   const handleFilterChange = (filter) => {
//     setSelectedFilter(filter);
//     if (filter === "Last Month") {
//       setFilteredBarData(barData.slice(2, 6)); // February to May
//     } else if (filter === "Last Week") {
//       setFilteredBarData(barData.slice(10, 12)); // November to December
//     } else {
//       setFilteredBarData(barData); // All months
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white">
//     <div className="container mt-4">
//       <div className=" p-3" style={{ color: "blue" }}>
//         <div className="d-flex align-items-center mb-2">
//           <img
//             src="https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg"
//             alt="Profile"
//             className="rounded-circle me-3"
//             style={{ height: 100, width: 100, objectFit: "cover" }}
//           />
//           <h5 className="mb-0">Hello Sneha</h5>
//         </div>
//         <div className="d-flex" style={{marginLeft:'10%',marginTop:-30}}>
//           <div className="text-center me-3">
//             <p className="mb-0">sneha@example.com</p>
//           </div>
//           <div className="vr mx-3"></div>
//           <div className="text-center me-3">
//             <p className="mb-0">📞 +123 456 7890</p>
//           </div>
//           <div className="vr mx-3"></div>
//           <div className="text-center">
//             <p className="mb-0">📍 123 Street, City, Country</p>
//           </div>
//         </div>
//       </div>
//     </div>

//       <div className="p-4 rounded-lg bg-white">
//   <div className="row g-4 mb-4">
//     <div className="col-md-12">
//       <div className="row text-black p-4 rounded-lg shadow-md" style={{ backgroundColor: "#8b61ed" }}>
        
//         <div className="col-md-3 d-flex flex-column align-items-center">
//           <h5 className="mb-2">Total Calls Made</h5>
//           <div className="d-flex align-items-center gap-2">
//             <FaPhone size={30} color="#1d1d7a"/>
//             <h3 className="mb-0">50</h3>
//           </div>
//         </div>

//         <div className="col-md-3 d-flex flex-column align-items-center">
//           <h5 className="mb-2">Successfull Conversion</h5>
//           <div className="d-flex align-items-center gap-2">
//             <FaCheckCircle size={30} color="#1d1d7a"/>
//             <h3 className="mb-0">50</h3>
//           </div>
//         </div>

//         <div className="col-md-3 d-flex flex-column align-items-center">
//           <h5 className="mb-2">Pending Follow Ups</h5>
//           <div className="d-flex align-items-center gap-2">
//             <FaEnvelopeOpen size={30} color="#1d1d7a"/>
//             <h3 className="mb-0">50</h3>
//           </div>
//         </div>

//         <div className="col-md-3 d-flex flex-column align-items-center">
//           <h5 className="mb-2">Drops-offs</h5>
//           <div className="d-flex align-items-center gap-2">
//             <FaTimesCircle size={30} color="#1d1d7a"/>
//             <h3 className="mb-0">50</h3>
//           </div>
//         </div>

//       </div>
//     </div>
//   </div>
// </div>

//       <div className="border p-4 rounded-lg shadow-md">

//       {/* <div className="d-flex mt-4 ml-2">
//           <div>
//             <label className="me-2"><strong>From:</strong></label>
//             <input
//               type="date"
//               className="form-control d-inline w-auto"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="me-2"><strong>To:</strong></label>
//             <input
//               type="date"
//               className="form-control d-inline w-auto"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
//         </div> */}

//         <div className="row g-4 mt-4">
//           {/* Bar Chart */}
//           <div className="col-md-6">
//             <div className=" p-4 rounded-lg shadow-md" style={{ height: "350px", position: "relative" }}>
//               <h2 className="text-xl font-semibold" style={{ marginTop: -30 }}>Overall Calls</h2>
//               <ResponsiveContainer width="100%" height="100%" style={{ marginTop: 35 }}>
//                 <BarChart
//                   data={filteredBarData}
//                   onMouseMove={(e) => {
//                     if (e.activePayload && e.activePayload.length > 0) {
//                       setHoveredData(e.activePayload[0].payload);
//                       setHoveredPosition(e.chartX);
//                     }
//                   }}
//                   onMouseLeave={() => {
//                     setTimeout(() => {
//                       setHoveredData(null);
//                       setHoveredPosition(null);
//                     }, 200); // Smooth transition, no flickering
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip cursor={{ stroke: "none" }} wrapperStyle={{ display: "none" }} />
//                   {hoveredData && (
//                     <ReferenceLine x={hoveredData.name} stroke="gray" strokeDasharray="3 3" />
//                   )}
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* Delivered & Read counts above hovered bar */}
//               {hoveredData && hoveredPosition !== null && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: `${hoveredPosition}px`,
//                     top: 65,
//                     transform: "translateX(-50%)",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     color: "orange",
//                     width: '100%',
//                     lineHeight: '3px'
//                   }}
//                 >
//                   <p>Delivered: {hoveredData.delivered}</p>
//                   <p>Read: {hoveredData.read}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Pie Chart */}
//           <div className="col-md-6">
//             <div className="border p-4 rounded-lg shadow-md" style={{ height: "350px" }}>
//               <h2 className="text-xl font-semibold mb-2">Call Outcomes</h2>
//               <div className="d-flex justify-content-between align-items-center" style={{ height: '100%' }}>
//                 <ResponsiveContainer width="50%" height="100%">
//                   <PieChart>
//                     <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="d-flex flex-column justify-content-between align-items-start ml-3">
//                   {pieData.map((entry) => (
//                     <div key={entry.name} className="d-flex justify-content-between mb-2">
//                       <p style={{ color: "blue" }}>{entry.name} - </p>
//                       <span style={{ color: "orange" }}> {entry.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
