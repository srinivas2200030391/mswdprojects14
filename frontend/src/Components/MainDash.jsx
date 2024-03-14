import React from "react";

const MainDash = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1150px",
        height: "80vh",
        transform: "translateY(-38%)",
      }}>
      <div
        style={{
          backgroundColor: "rgba(249, 237, 237, 0.44)",
          height: "100%",
          transform: "translateY(55%)",
        }}>
        <p
          style={{
            textAlign: "center",
            transform: "translateY(60px)",
            fontSize: "30pt",
            color: "black",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textDecoration: "none",
          }}>
          Finance With Ease
        </p>
        <input
          type="text"
          style={{
            width: "30%",
            height: "40px",
            border: "1px solid black",
            borderRadius: "15pt",
            padding: "8pt",
            marginLeft: "300pt",
            transform: "translateY(100px)",
            fontSize: "15pt",
            color: "black",
            fontFamily: "sans-serif",
            textDecoration: "none",
          }}
          placeholder="🔎   Search"
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          transform: "translateY(70%)",
          height: "80%",
        }}></div>
    </div>
  );
};

export default MainDash;
