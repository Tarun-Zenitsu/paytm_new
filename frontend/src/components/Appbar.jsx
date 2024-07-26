import React from "react";

const Appbar = () => {
  return (
    <div className="border-b-2 border-slate-400">
      <div className="flex justify-between p-3 px-6">
        <div className="text-lg">PayTM</div>
        <div className="flex gap-2">
          <p className="text-lg">Hello</p>
          <div className="w-7  h-7 flex items-center justify-center rounded-full bg-gray-300">
            U
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
