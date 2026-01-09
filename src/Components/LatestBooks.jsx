import React from "react";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Book from "./Book";
import Loading from "./Loading";
import axios from "axios";

const LatestBooks = () => {
  const axiosInstance = useAxios();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      // const res = await axiosInstance.get(`/books`);
      const res = await axios("http://localhost:3000/books");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-500 text-center my-12">
        Latest Books Section
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-5 my-8">
        {books.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
