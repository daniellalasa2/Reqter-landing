import React from "react";
import img from "../assets/images/defaultInnerLinks.jpg";
const DefaultInnerLinks = () => {
  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${img}`,
          width: "100%",
          margin: "0",
          padding: "0",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "300px"
        }}
      />
      <div
        style={{
          width: "100%",
          position: "absolute",
          display: "block",
          backgroundColor: "rgba(0,0,0,0.4)",
          height: "300px",
          top: 0
        }}
      />
      <section
        style={{
          height: "300px",
          backgroundColor: "whitesmoke",
          lineHeight: 10
        }}
      >
        <h1 style={{ lineHeight: 7.5 }}>Coming Soon :)</h1>
      </section>
    </React.Fragment>
  );
};
export default DefaultInnerLinks;
