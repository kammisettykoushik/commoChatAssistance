import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from "recharts";
import { Dropdown } from "react-bootstrap";

const barData = [
  { name: "Jan", value: 30, delivered: 200, read: 20 },
  { name: "Feb", value: 45, delivered: 300, read: 50 },
  { name: "Mar", value: 60, delivered: 400, read: 60 },
  { name: "Apr", value: 80, delivered: 250, read: 30 },
  { name: "May", value: 55, delivered: 220, read: 40 },
  { name: "Jun", value: 70, delivered: 280, read: 35 }
];

const pieData = [
  { name: "Sent", value: 50, color: "#8884d8" },
  { name: "Failed", value: 25, color: "#82ca9d" },
  { name: "Reach", value: 25, color: "#ffc658" }
];

const Overview = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredBarData, setFilteredBarData] = useState(barData);
  const [hoveredData, setHoveredData] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "Last Month") {
      setFilteredBarData(barData.slice(2, 6));
    } else if (filter === "Last Week") {
      setFilteredBarData(barData.slice(4, 6));
    } else {
      setFilteredBarData(barData);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2>Dashboard</h2>
      <p className="text-lg text-gray-600 mb-4">Welcome to the dashboard</p>

      <div className="border p-4 rounded-lg shadow-md">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-xl font-semibold">Performance Over Time</h2>
          <Dropdown>
            <Dropdown.Toggle variant="primary">Filter: {selectedFilter}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterChange("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("Last Month")}>Last Month</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("Last Week")}>Last Week</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="row g-4 mt-4">
          {/* Bar Chart */}
          <div className="col-md-6">
            <div className="border p-4 rounded-lg shadow-md p-5" style={{ height: "350px", position: "relative" }}>
              <h2 className="text-xl font-semibold" style={{ marginTop: -30 }}>Campaign Performance</h2>
              <ResponsiveContainer width="100%" height="100%" style={{ marginTop: 35 }}>
                <BarChart
                  data={filteredBarData}
                  onMouseMove={(e) => {
                    if (e.activePayload && e.activePayload.length > 0) {
                      setHoveredData(e.activePayload[0].payload);
                      setHoveredPosition(e.chartX);
                    }
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setHoveredData(null);
                      setHoveredPosition(null);
                    }, 200); // Smooth transition, no flickering
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ stroke: "none" }} wrapperStyle={{ display: "none" }} />
                  {hoveredData && (
                    <ReferenceLine x={hoveredData.name} stroke="gray" strokeDasharray="3 3" />
                  )}
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

              {/* Delivered & Read counts above hovered bar */}
              {hoveredData && hoveredPosition !== null && (
                <div
                  style={{
                    position: "absolute",
                    left: `${hoveredPosition}px`,
                    // top: "30px",
                    top: 65,
                    transform: "translateX(-50%)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "orange",
                    width: '100%',
                    lineHeight: '3px'
                  }}
                >
                  <p> Delivered {hoveredData.delivered}</p>
                  <p> Read {hoveredData.read}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-md-6">
            <div className="border p-4 rounded-lg shadow-md" style={{ height: "350px" }}>
              <h2 className="text-xl font-semibold mb-2">Sent vs Failed vs Reach</h2>
              <div className="d-flex justify-content-between align-items-center" style={{ height: '100%' }}>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie data={barData.slice(0, 3)} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {barData.slice(0, 3).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="d-flex flex-column justify-content-between align-items-start ml-3">
                  {pieData.slice(0, 3).map((entry) => (
                    <div key={entry.name} className="d-flex justify-content-between mb-2">
                      <p style={{ color: "blue" }}>{entry.name} - </p>
                      <span style={{ color: "orange" }}> {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;
