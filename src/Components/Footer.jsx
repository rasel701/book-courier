import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-200 py-16 mt-20 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/books" className="hover:text-white transition">
                  Books
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>
              Email:{" "}
              <a
                href="mailto:info@bookcourier.com"
                className="hover:text-white transition"
              >
                rasel70821185@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+880123456789"
                className="hover:text-white transition"
              >
                +880 1577 031 291
              </a>
            </p>
            <p>Address: 123 Book Street, Dhaka, Bangladesh</p>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-xl"
              >
                <SiX />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12"></div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BookCourier. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
