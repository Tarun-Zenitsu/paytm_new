import React from "react";

const InputBox = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="text-lg font-medium">{label}</div>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-slate-400 rounded-lg outline-none h-9 p-2"
      />
    </div>
  );
};

export default InputBox;