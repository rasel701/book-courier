import React from "react";
import DashboardStatus from "../Components/DashboardStatus";
import OrderStatusChart from "../Components/OrderStatusChart";
import DailyOrder from "../Components/DailyOrder";

const LibrarianDashboardHome = () => {
  return (
    <div>
      <DashboardStatus />
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-[400px] rounded-lg">
        <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
          Order Status Overview
        </h1>
        <div className="flex justify-center">
          <OrderStatusChart />
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboardHome;
