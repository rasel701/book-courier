import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { UserAuthContext } from "../../ContextAPI/AuthContext";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserAuthContext);

  const { data: myorders = [], isLoading } = useQuery({
    queryKey: ["myorder", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-order/${user?.email}`);
      return res.data;
    },
  });

  console.log(myorders);

  return <div>This is a my order page</div>;
};

export default MyOrders;
