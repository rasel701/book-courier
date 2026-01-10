import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { ThemeContext } from "../ContextAPI/ThemeProvider";
import logo from "../assets/book-courier-logo-imag.png";
import InfoIcon from "@mui/icons-material/Info";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";

const Navber = () => {
  const { user, logoutUser } = useContext(UserAuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === "dark");

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleLogoutUser = () => {
    logoutUser()
      .then(() => {
        toast.success("User logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // NavLink Style Helper
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
      isActive
        ? "bg-primary text-white shadow-md scale-105"
        : "hover:bg-primary/10 hover:text-primary"
    }`;

  const links = (
    <>
      <li>
        <NavLink to={"/"} className={navLinkStyles}>
          <HomeIcon fontSize="small" />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/books"} className={navLinkStyles}>
          <BookIcon fontSize="small" />
          <span>Books</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/about"} className={navLinkStyles}>
          <InfoIcon fontSize="small" />
          <span>About</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/contact"} className={navLinkStyles}>
          <ContactEmergencyIcon fontSize="small" />
          <span>Contact</span>
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/dashboard"} className={navLinkStyles}>
              <DashboardIcon fontSize="small" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/free-books"} className={navLinkStyles}>
              <BookIcon fontSize="small" />
              <span>Free Books</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 px-2 pt-2">
      <div className="navbar bg-base-100/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 px-4 md:px-8">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-primary p-0.5"
              src={logo}
              alt="Logo"
            />
            <span className="hidden md:block font-bold text-xl tracking-tight text-primary">
              BookCourier
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {/* Theme Toggle - Updated for smaller size */}
          <div className="hidden sm:block">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={checked}
              onChange={() => {
                toggleTheme();
                setChecked(!checked);
              }}
            />
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/mJR9Qkv/user.png"}
                    alt="User profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64 border border-base-300"
              >
                <li className="p-4 border-b border-base-200">
                  <p className="font-bold text-lg">
                    {user?.displayName || "User Name"}
                  </p>
                  <p className="text-xs opacity-60 italic">{user?.email}</p>
                </li>
                <li>
                  <Link to="/dashboard" className="py-3 mt-2">
                    <DashboardIcon fontSize="small" /> Profile Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogoutUser}
                    className="btn btn-error btn-outline btn-sm mt-4 w-full flex items-center justify-center gap-2"
                  >
                    <LogoutIcon fontSize="small" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="btn btn-primary btn-md rounded-xl flex items-center gap-2 shadow-lg hover:shadow-primary/50 transition-all duration-300"
              to={"/login"}
            >
              <LoginIcon />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
