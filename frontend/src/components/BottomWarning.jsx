import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="flex gap-1">
      <div>{label}</div>
      <Link to={to}>{buttonText}</Link>
    </div>
  );
};

export default BottomWarning;
