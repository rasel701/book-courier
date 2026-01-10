// import React from "react";
// import RepeatOnIcon from "@mui/icons-material/RepeatOn";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import { Link, Outlet } from "react-router";
// import HomeFilledIcon from "@mui/icons-material/HomeFilled";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import useRole from "../Hooks/useRole";
// import PeopleIcon from "@mui/icons-material/People";
// import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// const DashboardLayout = () => {
//   const { role } = useRole();

//   return (
//     <>
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300">
//             <label
//               htmlFor="my-drawer-4"
//               className="btn btn-square btn-ghost"
//               aria-label="open sidebar"
//             >
//               <RepeatOnIcon color="success" />
//             </label>
//             <div className="px-4">
//               {role?.role?.charAt(0)?.toUpperCase() + role?.role?.slice(1)}{" "}
//               Dashboard
//             </div>
//           </nav>
//           {/* Page content here */}
//           <div className="p-4">
//             <Outlet />
//           </div>
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label
//             htmlFor="my-drawer-4"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             {/* Sidebar content here */}
//             <ul className="menu w-full grow">
//               {/* List item */}
//               <li>
//                 <Link
//                   to={"/"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Homepage"
//                 >
//                   {/* Home icon */}
//                   <HomeFilledIcon />
//                   <span className="is-drawer-close:hidden"> Home</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={"/dashboard"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Dashboard home"
//                 >
//                   {/* Home icon */}
//                   <DashboardCustomizeIcon />
//                   <span className="is-drawer-close:hidden">Dashboard Home</span>
//                 </Link>
//               </li>
//               {role.role === "user" && (
//                 <>
//                   <li data-tip="My order">
//                     <Link
//                       to={"/dashboard/my-orders"}
//                       data-tip="My order"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <Inventory2Icon />
//                       <span className="is-drawer-close:hidden">My Order</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/invoices"}
//                       data-tip="Invoices"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <ReceiptIcon />
//                       <span className="is-drawer-close:hidden">Invoices</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/my-profile"}
//                       data-tip="My profile"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <AccountBoxIcon />
//                       <span className="is-drawer-close:hidden">My Profile</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/wish-list"}
//                       data-tip="Wish list"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <BookmarkAddedIcon />
//                       <span className="is-drawer-close:hidden">Wish List</span>
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {role.role === "librarian" && (
//                 <>
//                   <li>
//                     <Link
//                       to={"/dashboard/add-book"}
//                       data-tip="Add book"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <LibraryAddCheckIcon />
//                       <span className="is-drawer-close:hidden">Add Book</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/my-book"}
//                       data-tip="My books"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <MenuBookIcon />
//                       <span className="is-drawer-close:hidden">My Books</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/order-list"}
//                       data-tip="Orders"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <ReceiptLongIcon />
//                       <span className="is-drawer-close:hidden">Orders</span>
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {role.role === "admin" && (
//                 <>
//                   <li>
//                     <Link
//                       to={"/dashboard/all-users"}
//                       data-tip="All users"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <PeopleIcon />
//                       <span className="is-drawer-close:hidden">All Users</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/manage-books"}
//                       data-tip="Manage books"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <LibraryBooksIcon />
//                       <span className="is-drawer-close:hidden">
//                         Manage Books
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/my-profile"}
//                       data-tip="My profile"
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     >
//                       <AccountBoxIcon />
//                       <span className="is-drawer-close:hidden">My Profile</span>
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router";
import useRole from "../Hooks/useRole";

// Icons
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { UserAuthContext } from "../ContextAPI/AuthContext";

const DashboardLayout = () => {
  const { role } = useRole();
  const location = useLocation();
  const { user } = useContext(UserAuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-primary text-white shadow-lg"
      : "text-gray-600 hover:bg-base-300";

  const menuItems = (
    <>
      <div className="text-xs font-bold text-gray-400 uppercase mb-2 px-4">
        Main Menu
      </div>
      <li>
        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive(
            "/"
          )}`}
        >
          <HomeFilledIcon fontSize="small" /> <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive(
            "/dashboard"
          )}`}
        >
          <DashboardCustomizeIcon fontSize="small" />{" "}
          <span>Dashboard Home</span>
        </Link>
      </li>

      {/* User Role Links */}
      {role.role === "user" && (
        <>
          <div className="text-xs font-bold text-gray-400 uppercase mt-6 mb-2 px-4">
            User Actions
          </div>
          <li>
            <Link
              to="/dashboard/my-orders"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/my-orders"
              )}`}
            >
              <Inventory2Icon /> My Orders
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/invoices"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/invoices"
              )}`}
            >
              <ReceiptIcon /> Invoices
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/wish-list"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/wish-list"
              )}`}
            >
              <BookmarkAddedIcon /> Wish List
            </Link>
          </li>
        </>
      )}

      {/* Librarian Role Links */}
      {role.role === "librarian" && (
        <>
          <div className="text-xs font-bold text-gray-400 uppercase mt-6 mb-2 px-4">
            Management
          </div>
          <li>
            <Link
              to="/dashboard/add-book"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/add-book"
              )}`}
            >
              <LibraryAddCheckIcon /> Add Book
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-book"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/my-book"
              )}`}
            >
              <MenuBookIcon /> My Books
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/order-list"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/order-list"
              )}`}
            >
              <ReceiptLongIcon /> Orders
            </Link>
          </li>
        </>
      )}

      {/* Admin Role Links */}
      {role.role === "admin" && (
        <>
          <div className="text-xs font-bold text-gray-400 uppercase mt-6 mb-2 px-4">
            Administration
          </div>
          <li>
            <Link
              to="/dashboard/all-users"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/all-users"
              )}`}
            >
              <PeopleIcon /> All Users
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/manage-books"
              className={`flex gap-3 p-3 rounded-xl ${isActive(
                "/dashboard/manage-books"
              )}`}
            >
              <LibraryBooksIcon /> Manage Books
            </Link>
          </li>
        </>
      )}

      <div className="text-xs font-bold text-gray-400 uppercase mt-6 mb-2 px-4">
        Settings
      </div>
      <li>
        <Link
          to="/dashboard/my-profile"
          className={`flex gap-3 p-3 rounded-xl ${isActive(
            "/dashboard/my-profile"
          )}`}
        >
          <AccountBoxIcon /> Profile Settings
        </Link>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar for Mobile & Tablet */}
        <header className="navbar sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <MenuOpenIcon className="text-primary" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl uppercase tracking-widest text-primary">
            {role?.role} Panel
          </div>
        </header>

        {/* Main Page Content */}
        <main className="p-6 lg:p-10 grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <aside className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="w-72 min-h-full bg-white border-r border-base-300 flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-base-100 mb-4">
            <h1 className="text-2xl font-black text-primary flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">
                B
              </div>
              BOOKFLOW
            </h1>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
              {role?.role} Dashboard
            </p>
          </div>

          {/* Navigation Menu */}
          <ul className="menu px-4 py-0 grow gap-1">{menuItems}</ul>

          {/* User Profile Mini Card */}
          <div className="p-4 bg-base-200 m-4 rounded-2xl flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-neutral-content rounded-full w-10">
                <span className="text-xs">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">
                {role?.email || "User"}
              </p>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-primary font-bold uppercase">
                {role?.role}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardLayout;
