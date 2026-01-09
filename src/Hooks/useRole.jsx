import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useContext(UserAuthContext);
  const axiosInstance = useAxios();

  const { data: role = [], isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });
  
  return { role, isLoading };
};

export default useRole;
