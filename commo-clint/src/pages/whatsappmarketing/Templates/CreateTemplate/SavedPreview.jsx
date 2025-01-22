import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/Footer";

const SavedPreview = () => {
  const navigate = useNavigate();
  
  // Initialize state by reading from localStorage
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    // Check if there is saved data in localStorage
    const savedTemplates = JSON.parse(localStorage.getItem("SavedPreviews") || "[]");
    setSavedData(savedTemplates); // Set state with retrieved templates
  }, []);

  // Function to handle deleting a template
  const handleDelete = (index) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedData);
    localStorage.setItem("SavedPreviews", JSON.stringify(updatedData)); // Save updated data to localStorage
  };

  // Function to get the shape styles for images
  const getMediaShapeStyle = (shape) => {
    switch (shape) {
      case "Round":
        return { borderRadius: "50%" };
      case "Oval":
        return { borderRadius: "50% / 25%" };
      case "Rounded":
        return { borderRadius: "15px" };
      case "Semi-border":
        return { borderRadius: "0 50% 50% 0" };
      case "Diamond":
        return { transform: "rotate(45deg)", borderRadius: "10px" };
      default:
        return { borderRadius: "0" };
    }
  };

  return (
    <>
      <div className="container mt-4" style={{marginBottom:20}}>
        <button
          className="btn btn-primary mb-4"
          onClick={() => navigate("/whatsappmarketing/Templates/Preview")}
        >
          Back
        </button>

        {savedData.length === 0 ? (
          <div className="text-center mt-5">
            <p>No saved templates found!</p>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4" style={{ color: "#4a4a4a" }}>
              Saved Templates
            </h2>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {savedData.map((template, index) => (
                <div
                  key={index}
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
                  {/* Card Header */}
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

                  {/* Media Section */}
                  {template.mediaFile && (
                    <div
                      className="media-container my-3"
                      style={{ textAlign: "center" }}
                    >
                      {template.mediaType === "Image" ? (
                        <img
                          src={template.mediaFile} // Ensure this is the correct image path
                          alt={`Preview ${index}`}
                          className="img-fluid"
                          style={{
                            maxWidth: "90%",
                            maxHeight: "150px",
                            objectFit: "cover",
                            ...getMediaShapeStyle(template.mediaShape),
                          }}
                          onError={(e) => {
                            console.log("Image failed to load", e.target.src); // Log any image load errors
                            e.target.src = "defaultImage.jpg"; // Fallback image if error occurs
                          }}
                        />
                      ) : (
                        <video
                          src={template.mediaFile} // Video file path
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

                  {/* Card Body */}
                  <div className="card-body px-4 py-3">
                    <p>
                      <strong>Header:</strong> {template.header}
                    </p>
                    <p>
                      <strong>Body:</strong> {template.body}
                    </p>
                    <p>
                      <strong>Footer:</strong> {template.footer}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SavedPreview;
