import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import UsersList from "../components/UsersList";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="mx-10">
        <Balance />
        <UsersList />
      </div>
    </div>
  );
};

export default Dashboard;
