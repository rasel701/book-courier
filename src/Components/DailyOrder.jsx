import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const DailyOrder = () => {
  const { data: dailyOrder = [], isLoading } = useQuery({
    queryKey: ["dailyOrder"],
    queryFn: async () => {
      const res = await axios("http://localhost:3000/daily-order-books");
      return res.json();
    },
  });

  console.log(dailyOrder);

  return <div>daily order</div>;
};

export default DailyOrder;
