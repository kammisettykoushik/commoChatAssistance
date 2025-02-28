import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { CloseCircle, TickCircle, Clock } from "iconsax-react";

const BroadCastDetailsScreen = () => {
  const [filter, setFilter] = useState("All");

  const data = [
    { template: "Template 1", contacts: 100, status: "Failed", reason: "Network Issue" },
    { template: "Template 2", contacts: 200, status: "Failed", reason: "Invalid Number" },
    { template: "Template 3", contacts: 150, status: "Sent" },
    { template: "Template 4", contacts: 180, status: "Delivered" },
    { template: "Template 5", contacts: 120, status: "Read" },
    { template: "Template 6", contacts: 90, status: "Processing" },
    { template: "Template 7", contacts: 110, status: "Replied" },
    { template: "Template 8", contacts: 130, status: "Sending" },
    { template: "Template 9", contacts: 140, status: "Sent" },
    { template: "Template 10", contacts: 160, status: "Failed", reason: "Timeout" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Failed":
        return <CloseCircle size="25" color="red" />;
      case "Sent":
      case "Delivered":
      case "Read":
      case "Replied":
        return <TickCircle size="25" color="green" />;
      case "Processing":
      case "Sending":
        return <Clock size="25" color="orange" />;
      default:
        return null;
    }
  };

  const filteredData = filter === "All" ? data : data.filter((item) => item.status === filter);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full h-screen overflow-auto">
      <div className="items-center mb-4" style={{display:'flex',justifyContent:'space-between'}}>
       <div>
       <h2 className="text-xl font-bold">Broadcast Details</h2>
       </div>
        <div>
        <DropdownButton title={`Filter: ${filter}`} variant="primary" className="ml-auto">
          {["All", "Processing", "Failed", "Sent", "Replied", "Delivered", "Read", "Sending"].map((status) => (
            <Dropdown.Item key={status} onClick={() => setFilter(status)}>
              {status}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-4">Template Name</th>
              <th className="border p-4">Contacts</th>
              <th className="border p-4">Status</th>
              {filteredData.some(item => item.reason) && <th className="border p-4">Reason</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-4">{item.template}</td>
                <td className="border p-4">{item.contacts}</td>
                <td className="border p-4 flex justify-center items-center">
                  {getStatusIcon(item.status)} {item.status}
                </td>
                {item.reason && <td className="border p-4">{item.reason}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BroadCastDetailsScreen;
