import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,

      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <section className="py-16 bg-gray-50   my-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          className="text-3xl font-bold mb-3 text-gray-500"
          data-aos="fade-down"
        >
          What Our Readers Say
        </h2>

        <p
          className="text-gray-600 mb-12 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Thousands of readers trust BookCourier for fast delivery, quality
          books, and a great shopping experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            data-aos="zoom-in"
          >
            <div className="flex justify-center mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-6">
              “Super fast delivery! The packaging was excellent and the book
              quality is amazing. Highly recommended!”
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pravatar.cc/100?img=5"
                alt=""
              />
              <div className="text-left">
                <h4 className="font-semibold">Ratul Ahmed</h4>
                <p className="text-sm text-gray-500">University Student</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            data-aos="zoom-out"
            data-aos-delay="150"
          >
            <div className="flex justify-center mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-6">
              “I love the variety of books they offer. Their librarians curate
              the best collections. Amazing service!”
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pravatar.cc/100?img=12"
                alt=""
              />
              <div className="text-left">
                <h4 className="font-semibold">Maha Tasnim</h4>
                <p className="text-sm text-gray-500">Teacher</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            data-aos="flip-left"
            data-aos-delay="300"
          >
            <div className="flex justify-center mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-6">
              “Great platform for book lovers. I received genuine books and the
              support team is very friendly.”
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pravatar.cc/100?img=22"
                alt=""
              />
              <div className="text-left">
                <h4 className="font-semibold">Samiul Islam</h4>
                <p className="text-sm text-gray-500">Book Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
