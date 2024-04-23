import React, { useState } from "react";
import "./style.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/">
        <img src="Blogo.svg" className="logo" />
      </Link>
      <div className="menu btn2" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="#">Home</NavLink>
        </li>
        <li>
          <NavLink to="#service">Features</NavLink>
        </li>
        <li>
          <NavLink to="#about">About</NavLink>
        </li>
        <li>
          <NavLink to="#contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="signup">
            Sign Up
          </NavLink>
        
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
