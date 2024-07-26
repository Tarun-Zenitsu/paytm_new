import React from "react";
import InputBox from "./InputBox";

const UsersList = () => {
  return (
    <div className="mt-8">
      <InputBox label={"Users"} placeholder={"Serch...."} />
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <div className="w-7  h-7 flex items-center justify-center rounded-full bg-gray-300">
            T
          </div>
          <h1>Tarun kk</h1>
        </div>
        <button className="bg-black text-white rounded-md p-2">
          send money
        </button>
      </div>
    </div>
  );
};

export default UsersList;
