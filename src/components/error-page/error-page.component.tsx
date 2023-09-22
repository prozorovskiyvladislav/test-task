import React from "react";
import { useNavigate } from "react-router-dom";
import "./error-page.styles.css";

export const ErrorPageComponent = () => {
  const navigate = useNavigate();
  const handleTryAgain = () => {
    navigate("/");
  };
  return (
    <div className="error-page-wrapper">
      <h1>Sorry, something gone wrong!</h1>
      <button className="error-page-button" onClick={handleTryAgain}>
        Try again
      </button>
    </div>
  );
};

export default ErrorPageComponent;
