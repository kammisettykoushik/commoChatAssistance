import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../../components/Footer";

const SavedPreview = () => {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState(null); // State for contacts data

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/whatsappmarketing/templates");
        setSavedData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Failed to load templates");
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Function to fetch and display contacts
  const handleViewContacts = async (templateId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/whatsappmarketing/templates/${templateId}/contacts`);
      setSelectedContacts(response.data); // Store contacts data
    } catch (err) {
      console.error("Error fetching contacts:", err);
      alert("Failed to load contacts");
    }
  };

  const handleDelete = async (templateId) => {
    try {
      await axios.delete(`http://localhost:3001/api/whatsappmarketing/templates/${templateId}`);
      const updatedData = savedData.filter((template) => template.id !== templateId);
      setSavedData(updatedData);
      setSelectedContacts(null); // Clear contacts if deleted
    } catch (err) {
      console.error("Error deleting template:", err);
      alert("Failed to delete template");
    }
  };

  const getMediaShapeStyle = (shape) => {
    switch (shape) {
      case "Round": return { borderRadius: "50%" };
      case "Oval": return { borderRadius: "50% / 25%" };
      case "Rounded": return { borderRadius: "15px" };
      case "Semi-border": return { borderRadius: "0 50% 50% 0" };
      case "Diamond": return { transform: "rotate(45deg)", borderRadius: "10px" };
      default: return { borderRadius: "0" };
    }
  };

  return (
    <>
     <div style={{backgroundColor:'#FFF8EF'}}>
     <div className="container mt-4" style={{ marginBottom: 20 }}>
        <button
          className="btn btn-primary mb-4"
          onClick={() => navigate("/whatsappmarketing/Templates/Preview")}
        >
          Back
        </button>

        {loading ? (
          <div className="text-center mt-5">
            <p>Loading templates...</p>
          </div>
        ) : error ? (
          <div className="text-center mt-5">
            <p>{error}</p>
          </div>
        ) : savedData.length === 0 ? (
          <div className="text-center mt-5">
            <p>No saved templates found!</p>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4" style={{ color: "#4a4a4a" }}>
              Saved Templates
            </h2>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {savedData.map((template) => (
                <div
                  key={template.id}
                  className="card shadow-lg"
                  style={{
                    flex: "1 1 350px",
                    maxWidth: "350px",
                    minWidth: "300px",
                    borderRadius: "15px",
                    backgroundColor: "#fefefe",
                    border: "none",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="card-header text-white text-center py-3"
                    style={{
                      backgroundColor: "#4CAF50",
                      borderBottom: "5px solid #388E3C",
                    }}
                  >
                    <h5 style={{ margin: 0, fontWeight: "bold" }}>
                      {template.templateName}
                    </h5>
                    <span className="badge bg-light text-dark">
                      {template.category}
                    </span>
                  </div>

                  {template.mediaUrl && (
                    <div className="media-container my-3" style={{ textAlign: "center" }}>
                      {template.mediaType === "Image" ? (
                        <img
                          src={`http://localhost:3001${template.mediaUrl}`}
                          alt={`${template.templateName} Preview`}
                          className="img-fluid"
                          style={{
                            maxWidth: "90%",
                            maxHeight: "150px",
                            objectFit: "cover",
                            ...getMediaShapeStyle(template.mediaShape),
                          }}
                          onError={(e) => {
                            console.log("Image failed to load:", template.mediaUrl);
                            e.target.src = "defaultImage.jpg";
                          }}
                        />
                      ) : (
                        <video
                          src={`http://localhost:3001${template.mediaUrl}`}
                          controls
                          className="img-fluid"
                          style={{
                            maxWidth: "90%",
                            maxHeight: "150px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  )}

                  <div className="card-body px-4 py-3">
                    <p><strong>Header:</strong> {template.header || "N/A"}</p>
                    <p><strong>Body:</strong> {template.body}</p>
                    <p><strong>Footer:</strong> {template.footer || "N/A"}</p>
                    {template.contactsUrl && (
                      <p>
                        <strong>Contacts:</strong>{" "}
                        <a href={`http://localhost:3001${template.contactsUrl}`} download>
                          Download
                        </a>{" "}
                        |{" "}
                        <button
                          className="btn btn-link p-0"
                          onClick={() => handleViewContacts(template.id)}
                        >
                          View Contacts
                        </button>
                      </p>
                    )}
                  </div>

                  <div className="card-footer text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(template.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Display selected contacts */}
            {selectedContacts && (
              <div className="mt-4">
                <h3>Contacts</h3>
                <button
                  className="btn btn-secondary mb-2"
                  onClick={() => setSelectedContacts(null)}
                >
                  Close
                </button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {Object.keys(selectedContacts[0] || {}).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedContacts.map((contact, index) => (
                      <tr key={index}>
                        {Object.values(contact).map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
     </div>
      <Footer />
    </>
  );
};

export default SavedPreview;