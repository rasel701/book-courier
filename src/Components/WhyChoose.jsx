import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    title: "Fast Delivery",
    desc: "We deliver your books at lightning speed anywhere in Bangladesh.",
  },
  {
    title: "Best Price Guaranteed",
    desc: "Buy books at the most affordable price compared to others.",
  },
  {
    title: "Huge Collection",
    desc: "Thousands of books from all categories and authors.",
  },
  {
    title: "Secure Payment",
    desc: "Your transactions are encrypted and 100% safe.",
  },
];

const WhyChoose = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,

      once: false,
    });

    AOS.refresh();
  }, []);

  return (
    <div>
      <div className="py-20 bg-gray-100 dark:bg-gray-900 my-25">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Why Choose <span className="text-blue-500">BookCourier?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-5">
          {features.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
