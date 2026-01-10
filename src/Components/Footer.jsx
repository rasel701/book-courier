import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-[#0F172A] text-gray-300 pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand/About Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-white tracking-tighter italic">
              Book<span className="text-indigo-500">Flow</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Making the joy of reading accessible to everyone. We deliver
              knowledge safely and swiftly to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <SiX />, link: "#" },
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
          >
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-widest border-l-4 border-indigo-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "About Us", "Books", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    whileHover={{ x: 8 }}
                    className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-widest border-l-4 border-indigo-500 pl-3">
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:rasel70821185@gmail.com"
                className="flex items-start gap-4 hover:text-indigo-400 transition-colors group"
              >
                <EmailIcon
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                  fontSize="small"
                />
                <span className="break-all">rasel70821185@gmail.com</span>
              </a>
              <a
                href="tel:+8801577031291"
                className="flex items-center gap-4 hover:text-indigo-400 transition-colors group"
              >
                <PhoneIcon
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                  fontSize="small"
                />
                <span>+880 1577 031 291</span>
              </a>
              <div className="flex items-start gap-4">
                <LocationOnIcon className="text-indigo-500" fontSize="small" />
                <span>123 Book Street, Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter/Small CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            variants={fadeInUp}
          >
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-widest border-l-4 border-indigo-500 pl-3">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest book updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                GO
              </button>
            </div>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {currentYear}{" "}
            <span className="text-white font-bold">BookFlow</span>. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Abstract Background Blur */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]"></div>
    </footer>
  );
};

export default Footer;
