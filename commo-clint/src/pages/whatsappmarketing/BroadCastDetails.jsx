import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CloseCircle } from "iconsax-react";

const BroadCastDetailsScreen = () => {
  useEffect(() => {
    // alert("hello this component is loading..")
  }, []);

  const data = [
    { template: "Template 1", contacts: 100, failed: <CloseCircle size="25" color="black"/>, reason: "Network Issue" },
    { template: "Template 2", contacts: 200, failed: <CloseCircle size="25" color="black"/>, reason: "Invalid Number" },
    { template: "Template 3", contacts: 150, failed: <CloseCircle size="25" color="black"/>, reason: "Spam Detected" },
  ];

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full h-screen overflow-auto">
      <div className="flex justify-between items-center mb-4" style={{display:'flex',justifyContent:'space-between'}}>
        <h2 className="text-xl font-bold">Broadcast Details</h2>
        <Button variant="outline bg-primary text-white">Check</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-4">Template Name</th>
              <th className="border p-4">Contacts</th>
              <th className="border p-4">Failed</th>
              <th className="border p-4">Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-4">{item.template}</td>
                <td className="border p-4">{item.contacts}</td>
                <td className="border p-4">{item.failed}</td>
                <td className="border p-4">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BroadCastDetailsScreen;
