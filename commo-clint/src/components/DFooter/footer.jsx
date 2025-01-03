import React from "react";

const DirectFooter = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ff156a",
          color: "white",
          margin: "0 auto",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        <h4 style={{ margin: 0 }}>Success Stories</h4>
      </div>
      <h1 style={{ margin: "20px 0" }}>Our Case Study</h1>
      <p
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
          padding: "10px",
        }}
      >
        We have the ability to assist you to boost your business in a desired
        and positive environment. Several corporates/companies from different
        industries and geographies have entrusted BrandRise with the task of
        managing their Digital Marketing and Brand Building activities.
      </p>
    </div>
  );
};

export default DirectFooter;
