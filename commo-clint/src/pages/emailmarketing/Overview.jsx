import React, { useState,useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from "recharts";
import { Dropdown, Button,Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const barData = [
  { name: "Jan 15", value: 30, delivered: 200, read: 20, date: "2024-01-15" },
  { name: "Feb 10", value: 45, delivered: 300, read: 50, date: "2024-02-10" },
  { name: "Mar 05", value: 60, delivered: 400, read: 60, date: "2024-03-05" },
  { name: "Apr 12", value: 80, delivered: 250, read: 30, date: "2024-04-12" },
  { name: "May 18", value: 55, delivered: 220, read: 40, date: "2024-05-18" },
  { name: "Jun 20", value: 70, delivered: 280, read: 35, date: "2024-06-20" },
  { name: "Jan 25", value: 40, delivered: 180, read: 25, date: "2024-01-25" },
  { name: "Feb 15", value: 50, delivered: 310, read: 45, date: "2024-02-15" },
  { name: "Mar 10", value: 55, delivered: 390, read: 55, date: "2024-03-10" },
  { name: "Apr 18", value: 75, delivered: 260, read: 33, date: "2024-04-18" }
];

const pieData = [
  { name: "Sent", value: 50, color: "#82ca9d", route: "/emailmarketing/SentDataScreen" },
  { name: "Failed", value: 25, color: "#ffc658", route: "/emailmarketing/OverViewScreen" },
  { name: "Reach", value: 25, color: "#8884d8", route: "/emailmarketing/ReachScreen" }
];

const Overview = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredBarData, setFilteredBarData] = useState(barData);
  const [hoveredData, setHoveredData] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date()); // Temp date for preview before applying



  const updateBarData2 = () => {
    const selectedMonth = tempDate.getMonth() + 1;
    const filteredData = barData.filter(
      (item) => new Date(item.date).getMonth() + 1 === selectedMonth
    );
    setFilteredBarData(filteredData);
    setSelectedDate(tempDate);
  };


  const navigate = useNavigate();

  // Extract the selected month and filter data
  const updateBarData = () => {
    const selectedMonth = selectedDate.getMonth() + 1;
    const filteredData = barData.filter(item => new Date(item.date).getMonth() + 1 === selectedMonth);
    setFilteredBarData(filteredData);
  };

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

  const handleNavigation = (route) => {
    navigate(route);
  };


  const [counts, setCounts] = useState({
    Sent: 0,
    Delivered: 0,
    Draft: 0,
    Read: 0,
    Replied: 0,
    Failed: 0,
  });

  const finalCounts = {
    Sent: 150,
    Delivered: 130,
    Draft: 20,
    Read: 110,
    Replied: 80,
    Failed: 10,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setCounts((prevCounts) => {
        let newCounts = { ...prevCounts };
        let allReached = true;
        
        for (let key in newCounts) {
          if (newCounts[key] < finalCounts[key]) {
            newCounts[key] = Math.min(newCounts[key] + Math.ceil(finalCounts[key] / 20), finalCounts[key]);
            allReached = false;
          }
        }

        if (allReached) {
          clearInterval(interval);
        }
        return newCounts;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);




  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2>Dashboard</h2>
      <p className="text-lg text-gray-600 mb-4">Welcome to the dashboard</p>

      <div className="border p-4 rounded-lg shadow-md">
        {/* <div className="d-flex justify-content-between mb-4">
          <h2 className="text-xl font-semibold">Performance Over Time</h2>
          <Dropdown>
            <Dropdown.Toggle variant="primary">Filter: {selectedFilter}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterChange("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("Last Month")}>Last Month</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("Last Week")}>Last Week</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
     <div>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="text-xl font-semibold">Performance Over Time</h2>
        <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:'#FDEE96',border:'none',color:'black'}}>
            Filter: {selectedFilter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterChange("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("Last Month")}>
              Last Month
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("Last Week")}>
              Last Week
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sent</th>
            <th>Delivered</th>
            <th>Draft</th>
            <th>Read</th>
            <th>Replied</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{counts.Sent}</td>
            <td>{counts.Delivered}</td>
            <td>{counts.Draft}</td>
            <td>{counts.Read}</td>
            <td>{counts.Replied}</td>
            <td>{counts.Failed}</td>
          </tr>
        </tbody>
      </Table>
    </div>

        <div className="row g-4 mt-4 d-flex" style={{ display: "flex" }}>
          {/* Bar Chart */}
          <div className="col-md-6 d-flex">
            <div className="border p-4 rounded-lg shadow-md w-100" style={{ height: "420px" }}>
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <DatePicker
                  selected={tempDate}
                  onChange={(date) => setTempDate(date)}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                />
                <Button variant="success" size="sm" onClick={updateBarData2}>
                  Done
                </Button>
              </div>
              <h2 className="text-xl font-semibold">Campaign Performance</h2>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={filteredBarData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FDEE96" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-md-6 d-flex">
            <div className="border p-4 rounded-lg shadow-md w-100" style={{ height: "350px" }}>
              <h2 className="text-xl font-semibold mb-2">Sent vs Failed vs Reach</h2>
              <div className="d-flex justify-content-between align-items-center" style={{ height: "100%" }}>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label
                      onClick={(data, index) => handleNavigation(pieData[index].route)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="d-flex flex-column justify-content-between align-items-start ml-3">
                  {pieData.map((entry) => (
                    <div
                      key={entry.name}
                      className="d-flex align-items-center mb-2 cursor-pointer"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleNavigation(entry.route)}
                    >
                      <span style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: entry.color,
                        marginRight: "8px"
                      }}></span>
                      <p>{entry.name} - {entry.value}%</p>
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
