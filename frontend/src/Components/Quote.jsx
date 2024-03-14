import React from "react";
import "./quote.css";
const Quote = () => {
  return (
    <div className="quote">
      <img src="Ellipse 2358.png" />
      <img src="Frame.png" />
      <p>
        A customer is the most important visitor on our premises. He is not
        dependent on us. We are dependent on him. He is not an interruption on
        our work. He is the purpose of it. He is not an outsider on our
        business. He is part of it. We are not doing him a favour by serving
        him. He is doing us a favour by giving us an opportunity to do so.
      </p>
      <p className="name" style={{ fontSize: "15pt" }}>
        -Mahatma Gandhi
      </p>
    </div>
  );
};

export default Quote;
