import React from "react";
import { motion } from "framer-motion";

// Icons
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const handleMessageSend = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    const data = {
      name,
      email,
      subject,
      message,
    };
    const res = await axios.post(
      "http://localhost:3000/contact-messages",
      data
    );
    if (res?.data.acknowledged) {
      toast.success("Message sent successfully!");
      e.target.reset();
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      {/* Header Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex flex-col items-center justify-center text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Get In Touch
          </h1>
          <p className="max-w-xl mx-auto opacity-80 text-lg">
            Have questions about our books or delivery? We're here to help! Send
            us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ x: 10 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50 flex items-center gap-6"
            >
              <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 shadow-inner">
                <PhoneInTalkIcon fontSize="large" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Call Us
                </p>
                <p className="text-lg font-bold text-gray-800">
                  +880 1577-031291
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50 flex items-center gap-6"
            >
              <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 shadow-inner">
                <EmailIcon fontSize="large" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Email Us
                </p>
                <p className="text-lg font-bold text-gray-800">
                  rasel708211@gmail.com
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50 flex items-center gap-6"
            >
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-600 shadow-inner">
                <LocationOnIcon fontSize="large" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Our Office
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Mirpur, Dhaka, BD
                </p>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl text-white text-center">
              <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">
                Follow Our Journey
              </h4>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ y: -5 }}
                  className="bg-white/20 p-3 rounded-xl hover:bg-white/40 transition-all"
                >
                  <FacebookIcon />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5 }}
                  className="bg-white/20 p-3 rounded-xl hover:bg-white/40 transition-all"
                >
                  <LinkedInIcon />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5 }}
                  className="bg-white/20 p-3 rounded-xl hover:bg-white/40 transition-all"
                >
                  <TwitterIcon />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl border border-indigo-50"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                Send a Message
              </h2>
              <div className="w-12 h-1.5 bg-indigo-600 mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleMessageSend} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="h-14 px-5 rounded-2xl 
        bg-gray-100 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        border border-transparent
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition"
                    name="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="h-14 px-5 rounded-2xl 
        bg-gray-100 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        border border-transparent
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition"
                    name="email"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Topic of discussion"
                  className="h-14 px-5 rounded-2xl 
      bg-gray-100 dark:bg-gray-900 
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      border border-transparent
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition"
                  name="subject"
                  required
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Your Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="px-5 py-4 rounded-3xl 
      bg-gray-100 dark:bg-gray-900 
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      border border-transparent
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition resize-none"
                  name="message"
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-16 rounded-2xl 
    bg-indigo-600 hover:bg-indigo-700
    dark:bg-indigo-500 dark:hover:bg-indigo-600
    text-white text-lg font-semibold
    shadow-xl shadow-indigo-500/20
    flex items-center justify-center gap-2
    transition"
                type="submit"
              >
                <SendIcon /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[450px] border-8 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.254272231177!2d90.375862!3d23.80112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d33532b3fb%3A0x18018d9496739763!2sMirpur%2010!5e0!3m2!1sen!2sbd!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
