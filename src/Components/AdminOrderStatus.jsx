import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  pending: "#facc15",
  shipped: "#60a5fa",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const AdminOrderStatus = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = {}, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/order-data");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const chartData = [
    {
      name: "pending",
      value: orders.pendingOrder,
    },
    {
      name: "shipped",
      value: orders.shippedOrder,
    },
    {
      name: "delivered",
      value: orders.deliveredOrder,
    },
    {
      name: "cancel",
      value: orders.cancelOrder,
    },
  ];

  console.log(chartData);

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Order Status Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70} 
              outerRadius={110}
              label={({ name, value }) => `${name} (${value})`}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOrderStatus;
