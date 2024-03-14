import React from "react";

import "./Cards.css"; // Assuming you have a separate CSS file for styling

export default function Cards() {
  return (
    <div className="card-container">
      <div className="card-details">
        <h2 className="card-title">Credit Card</h2>
        <img src="Card79.png" alt="Card" className="card-image" />
        <table className="detail-table">
          <tbody>
            <tr>
              <td>Credit Limit:</td>
              <td>-₹50,000</td>
            </tr>
            <tr>
              <td>Available Credit:</td>
              <td>-₹37,500</td>
            </tr>
            <tr>
              <td>Last Statement Balance:</td>
              <td>-₹6,000</td>
            </tr>
            <tr>
              <td>Minimum Payment Due:</td>
              <td>-₹2,500</td>
            </tr>
            <tr>
              <td>Interest Rate:</td>
              <td>18.99% variable</td>
            </tr>
            <tr>
              <td>CVV:</td>
              <td>123</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
