import React, { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Invoices = () => {
  const axiosInstance = useAxios();

  const { user } = useContext(UserAuthContext);

  const { data: paymentInfo = [] } = useQuery({
    queryKey: ["payment-book", user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/payment-book/${user.email}`);
      return res.data;
    },
  });

  console.log(paymentInfo);

  return (
    <div>
      <h2>This is a invoices page</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Book-Name</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Payment Add</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
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
    </div>
  );
};

export default Invoices;
