import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainRoot = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainRoot;
