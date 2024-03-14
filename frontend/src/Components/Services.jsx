import React from "react";
import "./quote.css";
const Services = () => {
  return (
    <div className="services" id="service">
      <p align="center" style={{ fontSize: "35pt" }}>
        Some of the Features provided by us
      </p>
      <ul className="oneul">
        <li>
          <img src="Rectangle 14405.png" />
          <p align="center">Credit Cards</p>
        </li>
        <li>
          <img src="Rectangle 14406.png" />
          <p align="center">Debit Cards</p>
        </li>
        <li>
          <img src="Rectangle 14407.png" />
          <p align="center">Easy Loans</p>
        </li>
      </ul>
      <ul className="twoul">
        <li>
          <img src="Rectangle 14408.png" />
          <p align="center">Currency Exchange</p>
        </li>
        <li>
          <img src="Rectangle 14409.png" />
          <p align="center">Savings Account</p>
        </li>
        <li>
          <img src="Rectangle 14410.png" />
          <p align="center">Bill Payments</p>
        </li>
      </ul>
    </div>
  );
};

export default Services;
