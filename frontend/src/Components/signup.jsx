//
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import axios from 'axios';

export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    email: "",
    password: "",
    aadharNumber: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http:", formData);
      if (response.data != null) {
        console.log(response);
        setFormData({
          username: "",
          dateOfBirth: "",
          gender: "",
          mobileNumber: "",
          email: "",
          password: "",
          aadharNumber: "",
        });
      } else {
        setMessage("Sign In Failed");
      }
    } catch (e) {
      setError(e.message);
      setMessage("");
    }
  };
  return (
    <div
      className="signuppage"
      style={{
        backgroundColor: "#eee8e8",
        height: "100vh",
      }}>
      <div className="image">
        <img align="middle" src="image2.png" alt="Photo" />
      </div>
      <div
        className="form"
        align="center"
        style={{
          backgroundColor: "white",
          width: "500px",
          marginRight: "10%",
          borderRadius: "20pt",
          marginTop: "-10px",
          padding: "30pt",
        }}>
        <h3
          align="center"
          style={{
            fontSize: "30pt",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginTop: "-15px",
          }}>
          Sign Up
        </h3>
        <br />
        <Link
          className="forgot"
          to="/s"
          style={{
            marginTop: "17pt",
            textAlign: "center",
            fontSize: "15pt",
            color: "black",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textDecoration: "none",
            border: "1px solid black",
            borderRadius: "5pt",
            padding: "8pt",
            transform: "translateX(0%)",
            width: "80%",
          }}>
          📱Sign Up with Mobile
        </Link>
        <br />
        <br />
        <p
          style={{
            marginTop: "-10pt",
            textAlign: "center",
            fontSize: "15pt",
            color: "black",
            fontFamily: "sans-serif",
            textDecoration: "none",
            borderRadius: "5pt",
            padding: "8pt",
            transform: "translateX(-4%)",
            width: "100%",
          }}>
          -------------------- or ----------------------
        </p>
        <div className="input-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <label>Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="column">
                <label>Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="column">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="column">
                <label>Mobile Number</label>
                <input
                  type="text"
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Mobile number must be 10 digits long"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="column">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={!formData}>
                Get Started →
              </button>
            </div>

            <div className="signin-container">
              <p>Already have an account?</p>
              <Link to="/customersignin">Sign In</Link>
            </div>
          </form>
          <p
            style={{
              marginBottom: "-20pt",
              paddingTop: "10pt",

              fontSize: "14pt",
              transform: "translateX(5%)",
              fontStyle: "sans-serif",
            }}>
            Already have an account?
            <a
              href="signin"
              style={{
                paddingLeft: "5pt",
                color: "#FF4500",
                textDecoration: "none",
                fontSize: "14pt",
              }}>
              Sign In
            </a>
            {message ? (
              <h3 align="center">{message}</h3>
            ) : (
              <h3 align="center">{error}</h3>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
