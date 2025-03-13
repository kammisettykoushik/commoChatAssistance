import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";

const TemplatePreview = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: "Oval Shape",
      style: {
        backgroundColor: "#6c5ce7",
        borderRadius: "50% 25%",
      },
    },
    {
      id: 2,
      name: "Square Shape",
      style: {
        backgroundColor: "#00cec9",
      },
    },
    {
      id: 3,
      name: "Rounded Square",
      style: {
        backgroundColor: "#fd79a8",
        borderRadius: "15px",
      },
    },
    {
      id: 4,
      name: "Rectangle",
      style: {
        backgroundColor: "#e17055",
        width: "250px",
        height: "150px",
      },
    },
    {
      id: 5,
      name: "Circle",
      style: {
        backgroundColor: "#0984e3",
        borderRadius: "50%",
      },
    },
    {
      id: 6,
      name: "Diamond",
      style: {
        backgroundColor: "#00b894",
        transform: "rotate(45deg)",
        width: "150px",
        height: "150px",
      },
    },
  ];

  const handleTemplateClick = (templateId) => {
    // navigate(`/Preview/${templateId}`);
    // navigate(`/whatsappmarketing/Templates/Preview/${templateId}`);
    navigate('/whatsappmarketing/Templates/Preview/');
  };

  return (
    <div style={{ backgroundColor: "#FFF8EF", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Select Template</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {templates.map((template) => (
          <div
            key={template.id}
            style={{
              backgroundColor: "white",
              width: "300px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => handleTemplateClick(template.id)}
          >
            <div
              style={{
                ...template.style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
              }}
            >
              <FaRegImages size={30} color="white" />
            </div>
            <span style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
              {template.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;