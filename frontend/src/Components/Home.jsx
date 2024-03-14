import React from "react";
import NavBar from "./NavBar";
import Body from "./Body";
import Quote from "./Quote";
import Services from "./Services";
import About from "./about";
import { Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Contactus from "./Contactus";
import Rights from "./rights";
import Signup from "./signup";
import Cards from "./Cards";
import Profile from "./Profile";
import UserDashboard from "../UserDashboard";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <main>
              <NavBar />
              <Body />
              <Quote />
              <Services />
              <About />
              <Contactus />
              <Rights />
            </main>
          }
        />

        <Route path="/quote" el ement={<Quote />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/CreditCard" element={<Cards />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/userdashboard/*" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default Home;
