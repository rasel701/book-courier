import React, { useContext } from "react";
import {
  Pie,
  PieChart,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import useRole from "../Hooks/useRole";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../ContextAPI/ThemeProvider";

// Status onujayi color map
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const OrderStatusChart = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);

  const { data: orderData = [], isLoading } = useQuery({
    queryKey: ["orderData", role?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-book/${role.email}`);
      return res.data;
    },
  });

  const uniqueStatus = [
    ...new Set(orderData.map((order) => order.bookOrderDetails.status)),
  ];

  const chartData = uniqueStatus.map((status) => ({
    name: status,
    value:
      orderData.filter((item) => item.bookOrderDetails.status === status)
        .length || 0,
  }));

  if (isLoading) return <ChartSkeleton />;

  if (!orderData.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-base-200 rounded-3xl border-2 border-dashed border-gray-400">
        <p className="text-gray-500 font-medium italic">
          No order statistics available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-200 dark:border-white/10 flex flex-col items-center justify-center w-full">
      <h2 className="text-xl font-bold mb-4 text-primary self-start px-2">
        Order Analytics
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70} // Donut style
              outerRadius={100}
              paddingAngle={5} // Proti segment er majhe gap
              dataKey="value"
              stroke="none"
              cornerRadius={8} // Rounded corners for modern look
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- Skeleton Loader Component ---
const ChartSkeleton = () => {
  return (
    <div className="bg-base-100 p-6 rounded-3xl shadow-xl w-full animate-pulse border border-base-200">
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="flex justify-center items-center h-[250px]">
        <div className="relative w-48 h-48 border-[15px] border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center">
          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-800 rounded absolute"></div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default OrderStatusChart;
