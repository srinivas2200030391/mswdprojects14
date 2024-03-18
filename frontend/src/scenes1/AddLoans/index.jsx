import React, { useState } from "react";
import "./RegistrationPage.css";
import { useTheme } from "@mui/material";
import axios from "axios";
const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
  });
  const theme = useTheme();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2014/admin/createloan",
        formData
      );
      if (response.data != null) {
        console.log(response);
        setFormData({
          title: "",
          loanAmount: "",
          interestRate: "",
          loanTerm: "",
        });
      } else {
        setMessage("Sign In Failed");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="registration-container" style={{ marginTop: "-28pt" }}>
      <div
        className="registration-card"
        style={{
          backgroundColor: `${theme.palette.background.alt}`,
          border: "1px solid rgba(54, 51, 7, 0.897)",
          borderRadius: "10pt",
        }}>
        <h2 style={{ textAlign: "center" }}>Add Loans</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20pt" }}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                backgroundColor: `${theme.palette.background.alt}`,
                outline: "none",
                width: "103%",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loanAmount">Loan Amount</label>
            <input
              type="text"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              style={{
                backgroundColor: `${theme.palette.background.alt}`,
                outline: "none",
                width: "103%",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="interestRate">Interest Rate</label>
            <input
              type="interestRate"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              style={{
                backgroundColor: `${theme.palette.background.alt}`,
                outline: "none",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loanTerm">Loan Term</label>
            <input
              type="text"
              id="loanTerm"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              style={{
                backgroundColor: `${theme.palette.background.alt}`,
                outline: "none",
                width: "103%",
              }}
              required
            />
          </div>
          <input
            type="submit"
            value=" Register"
            className="register-btn"></input>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
