import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Book from "../../Components/Book";
import Loading from "../../Components/Loading";

const Books = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allbook", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books?search=${search}`);
      return res.data;
    },
  });

  const bookData = books.filter((bookItem) => bookItem.status === "published");

  console.log(search);

  return (
    <div>
      <div className="flex justify-center my-16">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="search"
            required
            placeholder="Search"
            value={search}
          />
        </label>
      </div>

      {isLoading && <Loading />}

      {bookData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5 my-8">
          {bookData?.map((book) => (
            <Book key={book._id} book={book}></Book>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-3xl text-center">Book Not found</h2>
        </div>
      )}
    </div>
  );
};

export default Books;
