import React from "react";
import useRole from "./../Hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import LibrarianDashboardHome from "./LibrarianDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import Loading from "../Components/Loading";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  console.log(role.role);
  if (isLoading) {
    return <Loading />;
  }

  if (role?.role === "admin") {
    return <AdminDashboardHome />;
  }
  if (role?.role === "librarian") {
    return <LibrarianDashboardHome />;
  }

  return <UserDashboardHome />;
};

export default DashboardHome;
