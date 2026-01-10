import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const faqs = [
    {
      q: "How fast is the delivery?",
      a: "Inside city limits, we deliver within 24 hours. Nationwide takes 2-3 days max!",
    },
    {
      q: "Can I pay after checking the book?",
      a: "Yes, we provide the best Cash On Delivery experience where you can inspect your book first.",
    },
    {
      q: "Is there any refund policy?",
      a: "We have a 7-day easy return policy if you receive a misprinted or damaged copy.",
    },
    {
      q: "Can I request a book?",
      a: "Definitely! Just message us on social media or email, and we'll try to source it for you.",
    },
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16" data-aos="fade-down">
        <span className="text-indigo-600 font-bold tracking-[0.3em] uppercase text-sm">
          Got Questions?
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4 uppercase italic tracking-tighter">
          The Helpful <span className="text-indigo-600">Answers</span>
        </h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="group"
          >
            <div className="collapse collapse-arrow bg-white dark:bg-gray-800 border-b-4 border-indigo-600/20 group-hover:border-indigo-600 rounded-[2rem] shadow-lg transition-all duration-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold text-gray-800 dark:text-indigo-200 py-6 px-8">
                {faq.q}
              </div>
              <div className="collapse-content px-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="pb-4">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
