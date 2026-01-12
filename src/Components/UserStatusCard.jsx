import React, { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Package,
  Truck,
  XCircle,
  CreditCard,
  AlertCircle,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import useAxios from "../Hooks/useAxios";

const UserStatusCard = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(UserAuthContext);

  const { data: myordersStatus = [], isLoading } = useQuery({
    queryKey: ["status", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-status/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(myordersStatus);
  const getCount = (array = [], id) => {
    const item = array.find((obj) => obj._id === id);
    return item ? item.count : 0;
  };

  const orderStats = [
    {
      id: "pending",
      count: getCount(myordersStatus[0]?.orderStatus, "pending"),
      label: "Pending Orders",
      icon: <Package />,
      color: "from-yellow-400 to-orange-500",
      shadow: "shadow-yellow-200/50",
    },
    {
      id: "shipped",
      count: getCount(myordersStatus[0]?.orderStatus, "shipped"),
      label: "In Transit",
      icon: <Truck />,
      color: "from-blue-400 to-indigo-600",
      shadow: "shadow-blue-200/50",
    },
    {
      id: "delivered",
      count: getCount(myordersStatus[0]?.orderStatus, "delivered"),
      label: "Delivered",
      icon: <CheckCircle />,
      color: "from-emerald-400 to-green-600",
      shadow: "shadow-green-200/50",
    },
    {
      id: "cancel",
      count: getCount(myordersStatus[0]?.orderStatus, "cancel"),
      label: "Cancelled",
      icon: <XCircle />,
      color: "from-red-400 to-rose-600",
      shadow: "shadow-red-200/50",
    },
  ];

  //
  const paymentStats = [
    {
      id: "paid",
      count: getCount(myordersStatus[0]?.payemntStatus, "paid"),
      label: "Total Paid",
      icon: <CreditCard />,
      color: "from-green-400 to-teal-600",
    },
    {
      id: "unpaid",
      count: getCount(myordersStatus[0]?.payemntStatus, "unpaid"),
      label: "Pending Payment",
      icon: <AlertCircle />,
      color: "from-orange-400 to-red-500",
    },
  ];

  if (isLoading)
    return (
      <div className="p-8 text-center animate-pulse">Loading Statistics...</div>
    );

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Activity Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Monitor your book courier performance
          </p>
        </div>
        <div className="hidden md:block bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 transition-all">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
            <TrendingUp size={20} />
            <span>Live Updates</span>
          </div>
        </div>
      </div>

      {/* Order Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {orderStats.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/10 dark:shadow-none transition-all duration-300 hover:scale-[1.03]"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${item.color} transition-opacity`}
            />
            <div className="flex items-center justify-between relative z-10">
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow}`}
              >
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">
                  {item.label}
                </p>
                <h3 className="text-3xl font-black text-gray-800 dark:text-white mt-1">
                  {item.count}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Status Grid */}
      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-6 ml-1 uppercase tracking-wider">
        Payment Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paymentStats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg transition-all hover:shadow-xl"
          >
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-lg`}
            >
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500 dark:text-gray-400 font-semibold">
                  {item.label}
                </p>
                <span className="text-2xl font-black text-gray-800 dark:text-white">
                  {item.count}
                </span>
              </div>
              {/* Progress Bar - Dynamic width calculation */}
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                  style={{
                    width: `${item.count > 0 ? (item.count / 10) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStatusCard;
