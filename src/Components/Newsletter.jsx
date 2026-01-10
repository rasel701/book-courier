import React from "react";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleEmailInfo = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    console.log(email);
    toast.success("Subscribed Successfully!");
    form.reset();
  };

  return (
    <section className="py-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative group"
      >
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-20 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl"
          >
            <SendIcon
              className="text-indigo-600 dark:text-indigo-400"
              sx={{ fontSize: 40 }}
            />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
            Stay Updated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              With BookFlow
            </span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-10 text-lg">
            Join 5,000+ book lovers! Get the latest releases and exclusive
            discount codes directly in your inbox.
          </p>

          <form
            onSubmit={handleEmailInfo}
            className="w-full max-w-lg relative flex items-center"
          >
            <input
              type="email"
              placeholder="yourname@email.com"
              className="w-full h-16 pl-8 pr-32 rounded-2xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-4 focus:ring-indigo-500/20 text-gray-800 dark:text-white transition-all outline-none text-lg shadow-inner"
              required
              name="email"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-colors"
              type="submit"
            >
              Join Now
            </motion.button>
          </form>

          {/* Floating Elements for Uniqueness */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-10 right-10 hidden md:block"
          >
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center text-pink-500 font-bold">
              📚
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
