import React from "react";
import AdminSummaryData from "../Components/AdminSummaryData";
import AdminOrderStatus from "../Components/AdminOrderStatus";
import PopularBooksChart from "../Components/PopularBooksChart";

const AdminDashboardHome = () => {
  return (
    <div>
      <AdminSummaryData />
      <div className="p-6 space-y-8">
        <AdminOrderStatus />
        <PopularBooksChart />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
