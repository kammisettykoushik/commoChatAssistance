import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { CloseCircle, TickCircle, Clock } from "iconsax-react";
import axios from "axios";

const BroadCastDetailsScreen = () => {
  const [filter, setFilter] = useState("All");
  const [broadcastData, setBroadcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch templates and contacts count on mount
  useEffect(() => {
    const fetchBroadcastData = async () => {
      try {
        // Fetch all templates
        const templatesResponse = await axios.get("http://localhost:3001/api/whatsappmarketing/templates");
        const templates = templatesResponse.data;

        // For each template, fetch contacts count if contactsUrl exists
        const broadcastDetails = await Promise.all(
          templates.map(async (template) => {
            let contactsCount = 0;
            if (template.contactsUrl) {
              const contactsResponse = await axios.get(
                `http://localhost:3001/api/whatsappmarketing/templates/${template.id}/contacts`
              );
              contactsCount = contactsResponse.data.length; // Count contacts from parsed file
            }

            // Map template data to broadcast format
            // For now, status and reason are placeholders; adjust based on your broadcast logic
            return {
              template: template.templateName,
              contacts: contactsCount,
              status: template.status === "Approved" ? "Sent" : "Processing", // Example mapping
              reason: template.status === "Approved" ? null : "Pending Approval", // Placeholder
            };
          })
        );

        setBroadcastData(broadcastDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching broadcast data:", err);
        setError("Failed to load broadcast details");
        setLoading(false);
      }
    };

    fetchBroadcastData();
  }, []);

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

  const filteredData = filter === "All" ? broadcastData : broadcastData.filter((item) => item.status === filter);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full h-screen overflow-auto" style={{backgroundColor:'#FFF8EF'}}>
      <div className="items-center mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
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
      {loading ? (
        <div className="text-center">Loading broadcast details...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : broadcastData.length === 0 ? (
        <div className="text-center">No broadcast data available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4">Template Name</th>
                <th className="border p-4">Contacts</th>
                <th className="border p-4">Status</th>
                {filteredData.some((item) => item.reason) && <th className="border p-4">Reason</th>}
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
      )}
    </div>
  );
};

export default BroadCastDetailsScreen;