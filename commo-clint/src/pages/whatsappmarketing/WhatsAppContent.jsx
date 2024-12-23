import React, { useState } from "react";
import { ArrowCircleLeft2 } from "iconsax-react";
import { contentData } from "./../../utils/data";

const WhatsAppContent = () => {
  const [selectedContent, setSelectedContent] = useState(contentData[0]);
  const handleIconClick = (content) => {
    setSelectedContent(content);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        padding: "20px",
        // backgroundColor:'#dffafa'
        backgroundColor: "whitesmoke",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={selectedContent.imageUrl}
          alt="Dynamic"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {selectedContent.heading}
          </p>
          <span style={{ color: "#555" }}>{selectedContent.description}</span>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2>
          Drive Engagement with<b style={{ color: "blue" }}> COMMO</b> WhatsApp
          Marketing Platform
        </h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Build long-term relationships, drive relevant conversations, and keep
          your customers hooked with WhatsApp marketing campaigns.
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {contentData.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => handleIconClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  transition: "background 0.3s",
                  backgroundColor:
                    selectedContent.id === item.id ? "#FFEBE6" : "transparent",
                }}
              >
                <ArrowCircleLeft2
                  size="48"
                  color={selectedContent.id === item.id ? "#FF8A65" : "#555"}
                />
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight:
                      selectedContent.id === item.id ? "bold" : "normal",
                    color: selectedContent.id === item.id ? "#333" : "#666",
                  }}
                >
                  {item.heading}
                </p>
              </div>
            ))}
          </div>

          {/* Second Group (3 items) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {contentData.slice(3, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => handleIconClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  transition: "background 0.3s",
                  backgroundColor:
                    selectedContent.id === item.id ? "#FFEBE6" : "transparent",
                }}
              >
                <ArrowCircleLeft2
                  size="48"
                  color={selectedContent.id === item.id ? "#FF8A65" : "#555"}
                />
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight:
                      selectedContent.id === item.id ? "bold" : "normal",
                    color: selectedContent.id === item.id ? "#333" : "#666",
                  }}
                >
                  {item.heading}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppContent;
