import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBook, FaCheckCircle, FaBan } from "react-icons/fa";
import Loading from "./Loading";

const DashboardStatus = () => {
  const { user } = useContext(UserAuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: librarianBooks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-book", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-book/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const publishBook = librarianBooks.filter(
    (book) => book.status === "published"
  );

  const unpublishBook = librarianBooks.filter(
    (book) => book.status === "unpublished"
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
        <div className="card shadow-lg bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition duration-300">
          <div className="text-blue-500 text-4xl ">
            <FaBook />
          </div>
          <div>
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
              Total Books
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              {librarianBooks?.length || 0}
            </p>
          </div>
        </div>

        <div className="card shadow-lg bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition duration-300">
          <div className="text-green-500 text-4xl">
            <FaCheckCircle />
          </div>
          <div>
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
              Published
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              {publishBook?.length || 0}
            </p>
          </div>
        </div>

        <div className="card shadow-lg bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition duration-300">
          <div className="text-red-500 text-4xl">
            <FaBan />
          </div>
          <div>
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-lg ">
              Unpublished
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              {unpublishBook?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatus;
