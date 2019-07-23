import React from "react";
import img from "../assets/images/temporarily/defaultInnerLinks.jpg";
import underconstruction from "../assets/images/temporarily/underconstruction.gif";
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
          height: "400px",
          backgroundColor: "white",
          lineHeight: 25
        }}
      >
        <img src={underconstruction} alt="under construction" />
      </section>
    </React.Fragment>
  );
};
export default DefaultInnerLinks;
