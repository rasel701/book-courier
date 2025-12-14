import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Loading from "./Loading";

const AdminSummaryData = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summaryInfo = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-summary");

      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const cards = [
    {
      title: "Total Users",
      value: summaryInfo.totalUser,
      icon: <PeopleIcon />,
      color: "bg-blue-500",
    },
    {
      title: "Total Books",
      value: summaryInfo.totalBooks,
      icon: <MenuBookIcon />,
      color: "bg-purple-500",
    },
    {
      title: "Published Books",
      value: summaryInfo.publishedBooks,
      icon: <CheckCircleIcon />,
      color: "bg-green-500",
    },
    {
      title: "Unpublished Books",
      value: summaryInfo.unpublishedBooks,
      icon: <BlockIcon />,
      color: "bg-red-500",
    },
    {
      title: "Total Orders",
      value: summaryInfo.totalOrder,
      icon: <LocalShippingIcon />,
      color: "bg-indigo-500",
    },
    {
      title: "Pending Orders",
      value: summaryInfo.pendingOrder,
      icon: <HourglassEmptyIcon />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 rounded-xl 
                     bg-white dark:bg-gray-800 
                     shadow hover:shadow-lg transition"
          >
            <div className={`p-3 rounded-full text-white ${card.color}`}>
              {card.icon}
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.title}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {card.value ?? 0}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSummaryData;
