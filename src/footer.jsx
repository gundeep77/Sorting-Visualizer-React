import React from "react";
import Typewriter from "typewriter-effect";
// Footer Component
const Footer = () => {
  return (
    <footer>
      <p>Sorting Wizard</p>
      <Typewriter
        options={{
          strings:
            "Visualize various sorting algorithms in real-time to clearly understand how they work!",
          autoStart: true,
          loop: false,
          cursor: "",
          delay: 75,
        }}
      />
    </footer>
  );
};

export default Footer;
