import React from "react";

const ButtonHeading = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white w-full rounded-lg h-9 my-2"
      type="button"
    >
      {label}
    </button>
  );
};

export default ButtonHeading;
