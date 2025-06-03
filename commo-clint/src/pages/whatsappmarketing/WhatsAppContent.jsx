import React, { useState } from "react";
import { ArrowCircleLeft2 } from "iconsax-react";
import { contentData } from "../../utils/data";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const WhatsAppContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        padding: "20px",
        backgroundColor: "white",
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {/* Left Side Carousel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Carousel
          activeIndex={activeIndex}
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
          
          interval={2000}
        >
          {contentData.map((item, index) => (
            <Carousel.Item key={item.id}>
              <img
                src={item.image}
                alt={`Slide ${index}`}
                style={{
                  width: "400px",
                  height: "350px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
              
            </Carousel.Item>
          ))}
        </Carousel>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {contentData[activeIndex].heading}
          </p>
        </div>
      </div>

      {/* Right Side Description & Grid List */}
      <div style={{ flex: 1 }}>
        <h2>
          Drive Engagement with <b style={{ color: "blue" }}>Trishoka Connect</b> Business
          Marketing Platform
        </h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          <span style={{ color: "#555" }}>{contentData[activeIndex].description}</span>
        </p>

        {/* 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {contentData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleIconClick(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "8px",
                transition: "background 0.3s",
                backgroundColor:
                  activeIndex === index ? "#FFEBE6" : "transparent",
              }}
            >
              <ArrowCircleLeft2
                size="48"
                color={activeIndex === index ? "#FF8A65" : "#555"}
              />
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: activeIndex === index ? "bold" : "normal",
                  color: activeIndex === index ? "#333" : "#666",
                }}
              >
                {item.heading}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppContent;