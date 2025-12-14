import React from "react";
import AdminSummaryData from "../Components/AdminSummaryData";
import AdminOrderStatus from "../Components/AdminOrderStatus";

const AdminDashboardHome = () => {
  return (
    <div>
      <AdminSummaryData />
      <div className="p-6 space-y-8">
        <AdminOrderStatus />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
