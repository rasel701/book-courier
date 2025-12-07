import React from "react";
import Banner from "../../Components/Banner";
import LatestBooks from "../../Components/LatestBooks";
import ServiceCenter from "../../Components/ServiceCenter";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestBooks />
      <ServiceCenter />
    </div>
  );
};

export default Home;
