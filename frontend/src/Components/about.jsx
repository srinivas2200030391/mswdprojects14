import React from "react";

const About = () => {
  return (
    <div className="about" id="about">
      <section className="started">
        <p style={{ color: "darkred", paddingTop: "10pt", fontSize: "30pt" }}>
          How It Started
        </p>

        <p style={{ paddingTop: "90pt" }} className="global">
          Global Learning Transformation is our dream.
        </p>
        <i>
          {" "}
          <p
            className="description"
            style={{
              paddingTop: "130pt",
              fontWeight: "normal",
              paddingBottom: "150pt",
            }}>
            " Here at Banking and Finance, we combine innovation and trust. Our
            dedication lies on providing individualized service and financial
            excellence. We provide an extensive range of banking options with an
            emphasis on security and cutting edge technology to enhance your
            financial experience. As we work together to create a better future.
            Our top priority is your success. "
          </p>
        </i>
      </section>
      <section className="about2">
        <section className="section1" style={{ backgroundColor: "white" }}>
          <img align="middle" src="Blogo.svg" />
        </section>
        <section className="section2">
          <div className="opaque">
            <i>
              <p>Trust</p>
            </i>
          </div>
          <div className="opaque1">
            {" "}
            <i>
              <p>Innovation</p>
            </i>
          </div>
          <div className="opaque2">
            {" "}
            <i>
              <p>Integrity</p>
            </i>
          </div>
          <div className="opaque3">
            {" "}
            <i>
              <p>Reliability</p>
            </i>
          </div>
        </section>
      </section>
    </div>
  );
};

export default About;
