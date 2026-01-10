import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";

const About = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const content = {
    en: {
      heroDesc:
        "Books should be your constant companion. We are committed to delivering your favorite books quickly and safely.",
      f1Title: "Thousand of Books",
      f1Desc: "Find all kinds of books from stories, poetry to education.",
      f2Title: "Fast Courier",
      f2Desc:
        "Books will reach your hands in a very short time after ordering.",
      f3Title: "Satisfied Readers",
      f3Desc:
        "Thousands of satisfied customers have trusted us over the years.",
      storyTitle: "Our Journey with Books",
      storyDesc:
        "We started in 2024 with a small vision. Our goal was to create a platform for book lovers where they could easily find their favorites.",
      btnText: "Learn More",
    },
    bn: {
      heroDesc:
        "বই হোক আপনার নিত্যসঙ্গী। আমরা আপনার প্রিয় বইগুলো দ্রুত এবং নিরাপদে আপনার কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।",
      f1Title: "হাজারো বই",
      f1Desc:
        "গল্প, কবিতা, শিক্ষা থেকে শুরু করে সব ধরণের বই পাবেন আমাদের কাছে।",
      f2Title: "দ্রুত কুরিয়ার",
      f2Desc: "অর্ডার করার পর খুব অল্প সময়ের মধ্যে আপনার হাতে বই পৌঁছে যাবে।",
      f3Title: "সন্তুষ্ট পাঠক",
      f3Desc: "হাজারো সন্তুষ্ট গ্রাহক আমাদের ওপর আস্থা রেখেছেন বছরের পর বছর।",
      storyTitle: "বইয়ের সাথে আমাদের পথচলা",
      storyDesc:
        "২০২৪ সালে আমরা ছোট পরিসরে যাত্রা শুরু করি। আমাদের উদ্দেশ্য ছিল বইপ্রেমীদের জন্য এমন একটি প্ল্যাটফর্ম তৈরি করা যেখানে তারা খুব সহজে বই খুঁজে পাবে।",
      btnText: "আরও জানুন",
    },
  };

  const t = content[language];

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[450px] flex flex-col items-center justify-center bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-6">
        {/* Language Switcher */}
        <div className="absolute top-10 right-10 z-50 flex bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/30">
          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              language === "en"
                ? "bg-white text-indigo-600 shadow-lg"
                : "text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("bn")}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              language === "bn"
                ? "bg-white text-indigo-600 shadow-lg"
                : "text-white"
            }`}
          >
            বাংলা
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl text-center text-lg md:text-xl opacity-90 leading-relaxed mt-4"
        >
          {t.heroDesc}
        </motion.p>
      </section>

      {/* Modern Gradient Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Blue Gradient */}
          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-blue-400 to-blue-600 shadow-2xl overflow-hidden group"
          >
            <div className="bg-white m-[2px] rounded-[2.4rem] p-8 h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <MenuBookIcon fontSize="large" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-4">
                {t.f1Title}
              </h3>
              <p className="text-gray-500">{t.f1Desc}</p>
              <div className="mt-6 w-12 h-1 bg-blue-500 rounded-full opacity-30"></div>
            </div>
          </motion.div>

          {/* Card 2 - Green Gradient */}
          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-2xl overflow-hidden group"
          >
            <div className="bg-white m-[2px] rounded-[2.4rem] p-8 h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-6 text-white shadow-lg shadow-emerald-200 group-hover:-rotate-12 transition-transform">
                <LocalShippingIcon fontSize="large" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-4">
                {t.f2Title}
              </h3>
              <p className="text-gray-500">{t.f2Desc}</p>
              <div className="mt-6 w-12 h-1 bg-emerald-500 rounded-full opacity-30"></div>
            </div>
          </motion.div>

          {/* Card 3 - Purple Gradient */}
          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-purple-400 to-purple-600 shadow-2xl overflow-hidden group"
          >
            <div className="bg-white m-[2px] rounded-[2.4rem] p-8 h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-3xl flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-200 group-hover:rotate-12 transition-transform">
                <PeopleIcon fontSize="large" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-4">
                {t.f3Title}
              </h3>
              <p className="text-gray-500">{t.f3Desc}</p>
              <div className="mt-6 w-12 h-1 bg-purple-500 rounded-full opacity-30"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          data-aos="fade-right"
          className="bg-white p-4 rounded-[3rem] shadow-xl border border-gray-100"
        >
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
            alt="Story"
            className="rounded-[2.5rem] w-full h-[400px] object-cover"
          />
        </div>

        <div data-aos="fade-left" className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {t.storyTitle}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">{t.storyDesc}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all"
          >
            {t.btnText}
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default About;
