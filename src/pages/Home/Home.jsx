import React from "react";
import Banner from "../../Components/Banner";
import LatestBooks from "../../Components/LatestBooks";
import ServiceCenter from "../../Components/ServiceCenter";
import WhyChoose from "../../Components/WhyChoose";
import TypeingAnimi from "../../Components/TypeingAnimi";
import Testimonial from "../../Components/Testimonial";
import CTASection from "../../Components/CTASection";
import Newsletter from "../../Components/Newsletter";
import FAQ from "../../Components/FAQ";

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
      <Newsletter />
      <FAQ />
    </div>
  );
};

export default Home;
