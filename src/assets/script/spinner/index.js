import React from "react";
import "./index.scss";
function Spinner({ width }) {
  return (
    <svg className="spinner" viewBox="0 0 50 50" style={{ width: width }}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
}

export default Spinner;
