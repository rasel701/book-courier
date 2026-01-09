import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

const PopularBooksChart = () => {
  const chartRef = useRef(null);

  const { data: popularBooks = [], isLoading } = useQuery({
    queryKey: ["popularBooks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/user-popular-books");
      return res.data;
    },
  });

  const sortedData = popularBooks
    .filter((item) => item._id !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const names = sortedData.map((item) => item._id);
  const counts = sortedData.map((item) => item.count);

  const option = {
    baseOption: {
      grid: {
        left: "3%",
        right: "15%",
        bottom: "5%",
        top: "5%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "value",
        splitLine: { lineStyle: { type: "dashed", opacity: 0.3 } },
      },
      yAxis: {
        type: "category",
        data: names.reverse(),
        axisLine: { lineStyle: { color: "#d1d5db" } },
        axisTick: { show: false },
        axisLabel: {
          color: "#4b5563",
          fontSize: 12,
          fontWeight: 600,

          formatter: (value) =>
            value.length > 20 ? value.slice(0, 18) + ".." : value,
        },
      },
      series: [
        {
          name: "Orders",
          type: "bar",
          data: counts.reverse(),
          barWidth: "60%",
          itemStyle: {
            borderRadius: [0, 10, 10, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#6366f1" },
                { offset: 1, color: "#10b981" },
              ],
            },
          },
          label: {
            show: true,
            position: "right",
            formatter: "{c}",
            fontWeight: "bold",
          },
        },
      ],
    },

    media: [
      {
        query: { maxWidth: 500 },
        option: {
          yAxis: {
            axisLabel: { fontSize: 10, margin: 8 },
          },
          grid: { left: "2%", right: "20%" },
          series: [{ label: { fontSize: 10 } }],
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 mt-6 md:mt-10 transition-all">
      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4 border-b border-gray-50 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 bg-indigo-600 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              Popular <span className="text-indigo-600">Books</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Top picks by users
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-bold self-start sm:self-center">
          REAL-TIME DATA
        </span>
      </div>

      {/* Chart Wrapper - Responsive Height */}
      <div className="w-full h-[400px] md:h-[550px]">
        {isLoading ? (
          <div className="w-full h-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
        ) : (
          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: "100%", width: "100%" }}
            opts={{ renderer: "svg" }}
          />
        )}
      </div>

      {/* Footer Info - Hidden on very small screens or adjusted */}
      {!isLoading && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-indigo-500">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Most Popular Book:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {sortedData[0]?._id}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularBooksChart;
