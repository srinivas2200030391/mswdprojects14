import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./signin.css";
import axios from "axios";
export default function Signin() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: location.state ? location.state.email : "",
    password: "",
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
        "http://localhost:2014/users/login",
        formData
      );
      if (response) {
        console.log(response.data);
        navigate("/user-dashboard/dashboard", {
          state: { email: formData.email },
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
      className="signinpage"
      style={{
        backgroundColor: "#eee8e8",
        height: "100vh",
      }}>
      <div className="image">
        <img align="middle" src="image1.png" alt="Photo" />
      </div>
      <div
        className="form"
        align="center"
        style={{
          backgroundColor: "white",
          width: "500px",
          marginRight: "10%",
          borderRadius: "20pt",
          // marginTop: "20%",
          padding: "29pt",
          height: "85%",
          transform: "translateY(0%)",
        }}>
        <h3
          align="center"
          style={{
            fontSize: "30pt",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginTop: "3%",
          }}>
          Sign In
        </h3>
        <br />
        <Link
          className="forgot"
          to="/s"
          style={{
            marginTop: "10pt",
            textAlign: "center",
            fontSize: "15pt",
            color: "black",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textDecoration: "none",
            border: "1px solid black",
            borderRadius: "5pt",
            padding: "8pt",
            transform: "translateX(-0%)",
            width: "90%",
          }}>
          📱Sign In with Mobile
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
          -------------------------------- or -------------------------------
        </p>
        <div className="input-wrapper">
          <form onSubmit={handleSubmit}>
            <p
              style={{
                paddingTop: "8pt",
                textAlign: "left",
                fontSize: "15pt",
                fontFamily: "sans-serif",
                transform: "translateX(2%)",
              }}>
              Email
            </p>
            <input
              type="email"
              id="email"
              className="inputemail"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                border: "1px solid black",
                height: "8pt",
                borderRadius: "5pt",
                padding: "12pt",
                transform: "translateX(-11px)",
                width: "30rem",
                height: "3rem",
              }}
            />
            <br />
            <p
              style={{
                paddingTop: "8pt",
                textAlign: "left",
                fontSize: "15pt",
                fontFamily: "sans-serif",
                transform: "translateX(1%)",
              }}>
              Password
            </p>
            <input
              type="password"
              id="password"
              className="inputpassword"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                border: "1px solid black",
                height: "8pt",
                borderRadius: "5pt",
                padding: "12pt",
                transform: "translateX(-11px)",
                width: "94%",
                height: "3rem",
              }}
            />
            <br />
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "13pt",
                marginTop: "15pt",
                left: "50%",
                paddingLeft: "117pt",
                fontFamily: "sans-serif",
                transform: "translateX(100%)",
              }}>
              Forgot Password?
            </Link>
            <br />
            <input
              type="submit"
              value="Sign In ➜"
              style={{
                marginTop: "15pt",
                padding: "10pt",
                fontSize: "12pt",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                border: "0.5px solid black",
                borderRadius: "15pt",
                transform: "translateX(-2%)",
                backgroundColor: "#D6C9C9",
              }}
            />

            <br />
          </form>
          <p
            style={{
              marginBottom: "-20pt",
              paddingTop: "10pt",

              fontSize: "14pt",
              transform: "translateX(5%)",
              fontStyle: "sans-serif",
            }}>
            Don't have an account?
            <a
              href="signup"
              style={{
                paddingLeft: "5pt",
                color: "#FF4500",
                textDecoration: "none",
                fontSize: "14pt",
              }}>
              Sign Up
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
