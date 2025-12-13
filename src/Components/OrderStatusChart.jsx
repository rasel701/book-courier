import React from "react";
import { Pie, PieChart, Legend, Tooltip } from "recharts";
import useRole from "../Hooks/useRole";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const OrderStatusChart = ({ isAnimationActive = true }) => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: orderData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orederData", role?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-book/${role.email}`);
      return res.data;
    },
  });

  const uniqueStatus = new Set(
    orderData.map((order) => order.bookOrderDetails.status)
  );

  const chartData = [...uniqueStatus].map((status) => ({
    name: status,
    value:
      orderData.filter((item) => item.bookOrderDetails.status === status)
        .length || 0,
  }));

  if (isLoading) {
    return <Loading />;
  }

  if (!orderData.length) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        No orders found yet.
      </div>
    );
  }

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "90vh",
        aspectRatio: 2,
      }}
      responsive
    >
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={chartData}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        fill="#8884d8"
        label={({ name, value }) => `${name}: ${value}`}
        isAnimationActive={isAnimationActive}
      />
      <Tooltip /> {/* Hover করলে detail দেখাবে */}
      <Legend /> {/* Chart এর পাশে color + name দেখাবে */}
    </PieChart>
  );
};

export default OrderStatusChart;
