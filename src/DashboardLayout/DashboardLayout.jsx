import React from "react";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link, Outlet } from "react-router";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import useRole from "../Hooks/useRole";
import PeopleIcon from "@mui/icons-material/People";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
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
            <div className="px-4">
              {role?.role?.charAt(0)?.toUpperCase() + role?.role?.slice(1)}{" "}
              Dashboard
            </div>
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
                  data-tip="Dashboard home"
                >
                  {/* Home icon */}
                  <DashboardCustomizeIcon />
                  <span className="is-drawer-close:hidden">Dashboard Home</span>
                </Link>
              </li>
              {role.role === "user" && (
                <>
                  <li data-tip="My order">
                    <Link
                      to={"/dashboard/my-orders"}
                      data-tip="My order"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <Inventory2Icon />
                      <span className="is-drawer-close:hidden">My Order</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/invoices"}
                      data-tip="Invoices"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <ReceiptIcon />
                      <span className="is-drawer-close:hidden">Invoices</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/my-profile"}
                      data-tip="My profile"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <AccountBoxIcon />
                      <span className="is-drawer-close:hidden">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/wish-list"}
                      data-tip="Wish list"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <BookmarkAddedIcon />
                      <span className="is-drawer-close:hidden">Wish List</span>
                    </Link>
                  </li>
                </>
              )}

              {role.role === "librarian" && (
                <>
                  <li>
                    <Link
                      to={"/dashboard/add-book"}
                      data-tip="Add book"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <LibraryAddCheckIcon />
                      <span className="is-drawer-close:hidden">Add Book</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/my-book"}
                      data-tip="My books"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <MenuBookIcon />
                      <span className="is-drawer-close:hidden">My Books</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/order-list"}
                      data-tip="Orders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <ReceiptLongIcon />
                      <span className="is-drawer-close:hidden">Orders</span>
                    </Link>
                  </li>
                </>
              )}

              {role.role === "admin" && (
                <>
                  <li>
                    <Link
                      to={"/dashboard/all-users"}
                      data-tip="All users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <PeopleIcon />
                      <span className="is-drawer-close:hidden">All Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/manage-books"}
                      data-tip="Manage books"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <LibraryBooksIcon />
                      <span className="is-drawer-close:hidden">
                        Manage Books
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard/my-profile"}
                      data-tip="My profile"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    >
                      <AccountBoxIcon />
                      <span className="is-drawer-close:hidden">My Profile</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
