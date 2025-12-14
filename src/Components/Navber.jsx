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

const Navber = () => {
  const { user, logoutUser } = useContext(UserAuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(user);

  const [checked, setChecked] = useState(theme === "dark");

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleLogoutUser = () => {
    logoutUser()
      .then(() => {
        toast.success("User logout successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>
          <HomeIcon color="success" />
          <span className="text-lg">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/books"}>
          <BookIcon color="success" />
          <span className="text-lg">Books</span>
        </NavLink>
      </li>

      <li>
        <NavLink to={"/dashboard"}>
          <DashboardIcon color="success" />
          <span className="text-lg">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <label className="inline-flex items-center relative">
          <input
            className="peer hidden"
            id="toggle"
            type="checkbox"
            checked={checked}
            onChange={() => {
              toggleTheme();
              setChecked(!checked);
            }}
          />
          <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md" />
          <svg
            height={0}
            width={100}
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
          >
            <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
          </svg>
          <svg
            height={512}
            width={512}
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
          >
            <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z" />
          </svg>
        </label>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg dark:bg-white dark:text-black dark:rounded-lg ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden z-10 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100  rounded-box z-50 mt-5 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
          <div>
            <img
              className="md:w-20 md:h-20 rounded-full object-cover w-[50px]"
              src={logo}
              alt=""
            />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex justify-center items-center">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar alt="Remy Sharp" src={user?.photoURL} />
              <div>
                <button
                  onClick={handleLogoutUser}
                  className="btn btn-active btn-primary text-lg"
                >
                  <LogoutIcon color="string" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              className="flex items-center gap-2 justify-center btn btn-active btn-primary"
              to={"/login"}
            >
              <LoginIcon color="string" />
              <span className="text-lg">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
