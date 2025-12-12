import React from "react";
import Banner from "../../Components/Banner";
import LatestBooks from "../../Components/LatestBooks";
import ServiceCenter from "../../Components/ServiceCenter";
import WhyChoose from "../../Components/WhyChoose";
import TypeingAnimi from "../../Components/TypeingAnimi";
import Testimonial from "../../Components/Testimonial";
import CTASection from "../../Components/CTASection";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestBooks />
      <ServiceCenter />
      <WhyChoose />
      <TypeingAnimi />
      <Testimonial />
      <CTASection />
    </div>
  );
};

export default Home;
