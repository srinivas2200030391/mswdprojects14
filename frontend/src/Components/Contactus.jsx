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
        <form align="center" className="form" onSubmit={getemail} style={{width:'82%'}}>
          <input
            type="text"
            className="form-control1"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Subject"
          />
          <input
            type="text"
            className="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />

          <input
            type="email"
            className="form-control3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Contactus;
