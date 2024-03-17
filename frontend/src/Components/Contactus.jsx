import React from "react";
import "./contact.css";
import { useNavigate } from "react-router-dom";
const Contactus = () => {
  const navigate = useNavigate();
  const getemail = async () => {
    navigate("/submit");
    console.log("Hello");
  };
  return (
    <div>
      <div className="container">
        <p align="center" style={{ fontSize: "30pt" }}>
          Contact Us
        </p>
        <br />
        <form
          align="center"
          className="form"
          onSubmit={getemail}
          style={{
            width: "82%",
            height: "55%",
            marginTop: "10pt",
          }}>
          <input
            type="text"
            className="form-control1"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Subject"
            style={{
              width: "100%",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "3%",
            }}
          />
          <input
            type="text"
            className="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            style={{
              width: "100%",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "3%",
            }}
          />

          <input
            type="email"
            className="form-control3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            style={{
              width: "100%",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "3%",
            }}
          />
          <input type="submit" value="Submit" style={{ marginTop: "3%" }} />
        </form>
      </div>
    </div>
  );
};

export default Contactus;
