import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link } from "react-router";

const CTASection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,

      once: false,
    });

    AOS.refresh();
  }, []);

  return (
    <section className="py-20 bg-primary text-white rounded-lg">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
          Ready to Explore More Books?
        </h2>

        <p
          className="text-lg mb-8 text-gray-200 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join thousands of book lovers who get updates, offers, and the best
          book recommendations every week.
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
            Subscribe to Newsletter
          </button>

          <Link to={"/books"}>
            <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition">
              Shop Now
            </button>
          </Link>

          <Link to={"/login"}>
            <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-900 transition">
              Create Your Account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
