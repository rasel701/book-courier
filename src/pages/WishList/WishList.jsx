import React, { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";

const WishList = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(UserAuthContext);

  const { data: parson = [], isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 dark:bg-base-200">
        <table className="table table-zebra">
          <thead className="bg-base-300">
            <tr>
              <th></th>
              <th>Book-Name</th>
              <th>Amount</th>
              <th>Author</th>
              <th>Category</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {parson?.wishlist?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item?.bookName}</td>
                <td>{item?.price}</td>
                <td>{item?.author}</td>
                <td>{item?.category}</td>
                <td>{new Date(item?.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
