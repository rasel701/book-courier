import React from "react";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link, Outlet } from "react-router";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import useRole from "../Hooks/useRole";

import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost"
              aria-label="open sidebar"
            >
              <RepeatOnIcon color="success" />
            </label>
            <div className="px-4">User Dashboard</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <HomeFilledIcon />
                  <span className="is-drawer-close:hidden"> Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <DashboardCustomizeIcon />
                  <span className="is-drawer-close:hidden">Dashboard Home</span>
                </Link>
              </li>
              {role.role === "user" && (
                <>
                  <li>
                    <Link to={"/dashboard/my-orders"}>
                      <Inventory2Icon />
                      <span className="is-drawer-close:hidden">My Order</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/invoices"}>
                      <ReceiptIcon />
                      <span className="is-drawer-close:hidden">Invoices</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/my-profile"}>
                      <AccountBoxIcon />
                      <span className="is-drawer-close:hidden">My Profile</span>
                    </Link>
                  </li>
                </>
              )}

              {role.role === "librarian" && (
                <>
                  <li>
                    <Link to={"/dashboard/my-orders"}>
                      <LibraryAddCheckIcon />
                      <span className="is-drawer-close:hidden">Add Book</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/my-orders"}>
                      <MenuBookIcon />
                      <span className="is-drawer-close:hidden">My Book</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/my-orders"}>
                      <ReceiptLongIcon />
                      <span className="is-drawer-close:hidden">Orders</span>
                    </Link>
                  </li>
                </>
              )}

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
