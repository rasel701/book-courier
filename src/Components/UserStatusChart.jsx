import React, { useContext, useRef } from "react";
import ReactECharts from "echarts-for-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";

// --- Skeleton Loader Component ---
const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 mt-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center mb-12 px-4">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>

    {/* Pie Chart Skeleton */}
    <div className="flex justify-center mb-16">
      <div className="relative h-48 w-48 rounded-full border-[16px] border-gray-200 dark:border-gray-700">
        {/* Center inner circle to look like donut */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 bg-transparent rounded-full border-4 border-dashed border-gray-100 dark:border-gray-800"></div>
        </div>
      </div>
    </div>

    {/* Bar Chart Skeleton */}
    <div className="flex items-end justify-around h-48 px-4 gap-2">
      <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
      <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
      <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
      <div className="h-44 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
      <div className="h-28 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
      <div className="h-36 w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
    </div>

    {/* Legend Labels Skeleton */}
    <div className="flex justify-center gap-4 mt-8">
      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const UserStatusChart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserAuthContext);

  const { data: myorders = [], isLoading } = useQuery({
    queryKey: ["myorder", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-order/${user?.email}`);
      return res.data;
    },
  });

  const chartRef = useRef(null);

  if (isLoading) return <ChartSkeleton />;

  const chartSource = [
    ["Product", "Price", "Status", "Payment"],
    ...myorders.map((order, index) => [
      order.bookName
        ? order.bookName.length > 15
          ? order.bookName.slice(0, 15) + "..."
          : order.bookName
        : `Order ${index + 1}`,
      parseFloat(order.price) || 0,
      order.status,
      order.paymentStatus,
    ]),
  ];

  const option = {
    color: ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
    legend: { top: "2%", textStyle: { color: "#9ca3af" } },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      textStyle: { color: "#1f2937" },
      borderWidth: 0,
      extraCssText:
        "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;",
    },
    dataset: { source: chartSource },
    xAxis: {
      type: "category",
      axisLabel: { interval: 0, rotate: 35, color: "#9ca3af", fontSize: 10 },
      axisLine: { lineStyle: { color: "#374151" } },
    },
    yAxis: {
      gridIndex: 0,
      name: "Price (৳)",
      nameTextStyle: { color: "#9ca3af" },
      axisLabel: { color: "#9ca3af" },
      splitLine: { lineStyle: { type: "dashed", color: "#374151" } },
    },
    grid: { top: "52%", bottom: "12%", left: "10%", right: "10%" },
    series: [
      {
        type: "bar",
        barWidth: "40%",
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        seriesLayoutBy: "column",
        emphasis: { focus: "series" },
      },
      {
        type: "pie",
        id: "pie",
        radius: ["20%", "35%"],
        center: ["50%", "28%"],
        roseType: "radius",
        emphasis: { focus: "self" },
        label: {
          show: true,
          formatter: "{b}\n{bold|৳{c}} ({d}%)",
          rich: {
            bold: { fontWeight: "bold", fontSize: 14, lineHeight: 20 },
          },
          color: "inherit",
        },
        labelLine: {
          lineStyle: { color: "#9ca3af" },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        encode: { itemName: "Product", value: "Price", tooltip: "Price" },
      },
    ],
  };

  const onChartReady = (instance) => {
    if (instance) {
      instance.on("updateAxisPointer", (event) => {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          instance.setOption({
            series: {
              id: "pie",
              label: { formatter: "{b}\n{bold|৳{c}} ({d}%)" },
            },
          });
        }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 mt-10 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4">
        <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
          Order Price Insight
        </h3>
        <span className="text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
          Live Data Sync
        </span>
      </div>

      <ReactECharts
        ref={chartRef}
        option={option}
        onChartReady={onChartReady}
        style={{ height: "650px", width: "100%" }}
      />
    </div>
  );
};

export default UserStatusChart;
