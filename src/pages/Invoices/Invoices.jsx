import React, { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Invoices = () => {
  const axiosInstance = useAxios();

  const { user } = useContext(UserAuthContext);

  const { data: paymentInfo = [] } = useQuery({
    queryKey: ["payment-book", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/payment-book/${user?.email}`);
      return res.data;
    },
  });


  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 dark:bg-base-200">
      <table className="table table-zebra">
        <thead className="bg-base-300">
          <tr>
            <th></th>
            <th>Book-Name</th>
            <th>Amount</th>
            <th>Payment ID</th>
            <th>Payment Add</th>
          </tr>
        </thead>
        <tbody>
          {paymentInfo.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment?.book_Name}</td>
              <td>{payment?.price}</td>
              <td>{payment?.paymentId}</td>
              <td>{new Date(payment?.payment_add).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
