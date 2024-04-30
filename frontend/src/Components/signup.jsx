import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import config from "../config";
export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    aadhar: "",
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
      const response = await axios.post(
        `${config.baseURL}/users/createuser`,
        formData
      );
      if (response.data != null) {
        console.log(response);
        setFormData({
          username: "",
          fullname: "",
          age: "",
          gender: "",
          phone: "",
          email: "",
          password: "",
          aadhar: "",
        });
      } else {
        setMessage("Sign In Failed");
      }
    } catch (e) {
      setError(e.message);
      setMessage("");
    }
  };
  const aadharnumber = (e) => {
    const aadhar = e.target.value;
    if (aadhar.length !== 12) {
      document.getElementById("message2").innerHTML =
        "Aadhar Number must be 12 digits";
    } else {
      document.getElementById("message2").innerHTML = "";
    }
  };
  const passwordvalidation = (e) => {
    const password = e.target.value;
    const validatepass =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!validatepass.test(password)) {
      document.getElementById("passmessage").innerHTML =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      document.getElementById("passmessage").innerHTML = "";
    }
  };
  const agevalidation = (e) => {
    const age = e.target.value;
    if (age <= 18) {
      document.getElementById("message1").innerHTML =
        "Only above 18 candidates can create an account";
    } else {
      document.getElementById("message1").innerHTML = "";
    }
  };
  const mobilenumber = (e) => {
    const mobile = e.target.value;
    if (mobile.length < 10 && mobile.length > 13) {
      document.getElementById("phone1").innerHTML =
        "Mobile Number should be 10 digits";
    } else {
      document.getElementById("phone").innerHTML = "";
    }
  };
  const changetext = (e) => {
    const fullname = e.target.value;
    const uppercase = fullname.toUpperCase();
    e.target.value = uppercase;
  };

  return (
    <div
      className="signuppage"
      style={{
        backgroundColor: "#eee8e8",
        height: "120vh",
      }}>
      <div
        className="image"
        style={{
          float: "left",
          width: "31%",
          marginTop: "30pt",
          transform: "translateY(80%) translateX(10%)",
        }}>
        <img src="image2.png" alt="Photo" />
      </div>
      <div
        className="form"
        style={{
          float: "right",
          transform: "translateX(-10%) translateY(2%)",
          backgroundColor: "white",
          height: "80%",
          borderRadius: "20pt",
        }}>
        <h3 style={{ fontSize: "34px", transform: "translateY(50%)" }}>
          Sign Up
        </h3>
        <br />
        <Link
          className="forgot"
          to="/s"
          style={{
            marginTop: "25pt",
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
            marginTop: "-7%",
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
            <div className="row" style={{ transform: "translateX(-10px)" }}>
              <div className="column">
                <label style={{ transform: "translateX(10pt)" }}>
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  onKeyUp={changetext}
                  required
                />
              </div>
              <div className="column">
                <label style={{ transform: "translateX(10pt)" }}>Age</label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  onKeyUp={agevalidation}
                  required
                />
                <i id="message1"></i>
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
                  id="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  onKeyUp={aadharnumber}
                  required
                />
                <i id="message2"></i>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <label>Mobile Number</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  onKeyUp={mobilenumber}
                  required
                />
                <i id="phone1"></i>
              </div>
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
                  onKeyUp={passwordvalidation}
                  required
                />
                <i id="passmessage"></i>
              </div>
            </div>

            <div className="button-container">
              <button
                type="submit"
                disabled={!formData}
                className="button-18 "
                style={{
                  backgroundColor: "rgba(208, 90, 16, 0.897)",
                  borderRadius: "90px",
                }}>
                Get Started →
              </button>
            </div>

            <div className="signin-container" style={{ fontSize: "15pt" }}>
              <p>Already have an account?</p>
              <Link to="/signin">Sign In</Link>
            </div>
          </form>

          {message ? (
            <h3 align="center">{message}</h3>
          ) : (
            <h3 align="center">{error}</h3>
          )}
        </div>
      </div>
    </div>
  );
}
