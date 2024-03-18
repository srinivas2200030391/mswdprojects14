import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const signin = async (ev) => {
    ev.preventDefault();
    console.log(email);
    navigate("/signin", { state: { email: email } });
  };
  return (
    <div style={{ alignContent: "center" }}>
      <h2 style={{ fontSize: "9vh", textAlign: "center" }}>
        Banking and Finance made easy
      </h2>
      <br />
      <h3 style={{ fontSize: "7vh", textAlign: "center" }}>
        For People of all work types
      </h3>
      <br />
      <h4 align="center" style={{ fontSize: "5vh", textAlign: "center" }}>
        Manage your debit and credit cards
      </h4>
      <br />
      <br />
      <form onSubmit={signin}>
        <div className="email">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginTop: "10px",
            }}
          />
          <input
            type="submit"
            value="Sign In"
            style={{ cursor: "pointer", width: "80pt" }}
          />
        </div>
      </form>
      <br />
      <div className="body2">
        <img src="Star 1.png" className="star1" />
        <ul>
          <li>
            <img src="Card1.png" />
          </li>
          <li>
            <img src="Card2.png" />
          </li>
          <li>
            <img src="Card3.png" />
          </li>
        </ul>
        <ul className="hearts">
          <li>
            {" "}
            <img src="Heart1.png" className="heart1" />
          </li>
          <li>
            {" "}
            <img src="Heart2.png" className="heart2" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Body;
