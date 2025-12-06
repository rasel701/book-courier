import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router";

const MainRoot = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <Navber />
      <Outlet />
    </div>
  );
};

export default MainRoot;
