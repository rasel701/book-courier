import React from "react";
import Navber from "../Components/Navber";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

const MainRoot = () => {
  const navigation = useNavigation();

  return (
    <div className="max-w-[90%] mx-auto">
      <Navber />
      {navigation.state === "loading" ? <Loading /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default MainRoot;
