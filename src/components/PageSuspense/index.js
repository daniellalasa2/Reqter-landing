import React from "react";
import "./index.scss";
function PageSuspense() {
  return (
    <div className="preloader">
      <div className="ball-rotate">
        <div />
      </div>
      <span className="loading-text">
        <strong>Startup Space</strong>
      </span>
    </div>
  );
}
export default PageSuspense;
