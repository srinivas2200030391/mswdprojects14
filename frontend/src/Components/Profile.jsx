import React from "react";

import "./Profile.css";
export default function Profile() {
  return (
    <div>
      <h3 style={{ fontSize: "270%" }}>Profile</h3>
      <div className="image">
        <img
          src="me.jpg"
          alt="Profile"
          style={{ width: "90px", borderRadius: "40rem" }}
        />
        <p>K.S.V Aravind</p>
      </div>
      <div className="table">
        <table className="detail-table">
          <tbody>
            <tr>
              <td>Email:</td>
              <td>venkataravind.123456@gmail.com</td>
            </tr>
            <tr>
              <td>Mobile Number:</td>
              <td>7993847898</td>
            </tr>
            <tr>
              <td>Account Number:</td>
              <td>123455669034</td>
            </tr>
            <tr>
              <td>Card Number:</td>
              <td>7489456123697456</td>
            </tr>
            <tr>
              <td>Balance:</td>
              <td>₹14,684</td>
            </tr>
            <tr>
              <td>CIBIL Score:</td>
              <td>729</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
