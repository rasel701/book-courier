import React, { useContext } from "react";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyBook = () => {
  const { user } = useContext(UserAuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: librarianBooks = [], isLoading } = useQuery({
    queryKey: ["librarian-book", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-book/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(librarianBooks);

  return (
    <div>
      <h2>This is a my book route</h2>
    </div>
  );
};

export default MyBook;
