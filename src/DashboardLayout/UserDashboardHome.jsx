import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";
import UserStatusCard from "../Components/UserStatusCard";
import UserStatusChart from "../Components/UserStatusChart";

const UserDashboardHome = () => {
  const { user } = useContext(UserAuthContext);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-500 text-center">
          Welcome {user?.displayName || "User"} to your Dashboard! 👋
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Get a quick overview of your library activities.
        </p>
      </div>
      <div>
        <UserStatusCard />
        <UserStatusChart />
      </div>
    </div>
  );
};

export default UserDashboardHome;
