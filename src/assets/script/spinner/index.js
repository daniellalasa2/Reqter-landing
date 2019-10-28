import React from "react";
import "./index.scss";
function Spinner({ width }) {
  return (
    <svg class="spinner" viewBox="0 0 50 50" style={{ width: width }}>
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  );
}

export default Spinner;
