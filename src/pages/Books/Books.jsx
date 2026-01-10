import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Book from "../../Components/Book";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const Books = () => {
  const axiosSecure = useAxiosSecure();

  const [filter, setFilter] = useState({
    category: "all",

    price: "all",

    search: "",

    page: 1,
  });

  const perePage = 5;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", filter.search, filter.category, filter.price],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/all-books?search=${filter.search}&category=${filter.category}&price=${filter.price}`
      );

      return res.data;
    },
  });

  console.log(books);

  const { data: allBooks = [] } = useQuery({
    queryKey: ["allBooksForCategories"],

    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books`);

      return res.data;
    },
  });

  const bookCategories = [...new Set(allBooks?.map((book) => book.category))];

  const prices = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const bookData = books

    .filter((bookItem) => bookItem.status === "published")

    .slice((filter.page - 1) * perePage, filter.page * perePage);

  const totalPage = Math.ceil(books.length / perePage);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilter((prev) => ({
      ...prev,

      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (event, value) => {
    setFilter((prev) => ({ ...prev, page: value }));
  };

  console.log("Filtered Books:", filter);

  const SkeletonLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {[...Array(perePage)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <Skeleton
            variant="rectangular"
            height={220}
            className="rounded-lg mb-4"
          />
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="60%" />
          <div className="flex justify-between mt-4">
            <Skeleton variant="text" width="30%" />
            <Skeleton
              variant="rectangular"
              width="30%"
              height={32}
              className="rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="bg-gray-300 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center my-6">
        {/* Category Select */}

        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>

          <Select
            name="category"
            value={filter.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="all">
              <em>All Category</em>
            </MenuItem>

            {bookCategories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Select */}

        <FormControl fullWidth size="small">
          <InputLabel>Price</InputLabel>

          <Select
            name="price"
            value={filter.price}
            onChange={handleChange}
            label="Price"
          >
            <MenuItem value="all">
              <em>All Price</em>
            </MenuItem>

            {prices.map((p, index) => (
              <MenuItem key={index} value={p}>
                Under {p} Tk
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Input */}

        <div className="flex justify-center">
          <input
            className="input input-bordered w-full max-w-xs p-2 rounded"
            name="search"
            value={filter.search}
            onChange={handleChange}
            placeholder="Search by title..."
            type="text"
          />
        </div>
      </div>

      {isLoading ? (
        <SkeletonLoading />
      ) : bookData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-18">
            {bookData.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>

          <div className="my-16 flex justify-center">
            <Stack
              spacing={2}
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <Pagination
                count={totalPage}
                page={filter.page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "var(--tw-text-opacity)",
                    className: "text-gray-700 dark:text-gray-700",
                  },

                  "& .Mui-selected": {
                    backgroundColor: "#3b82f6 !important",
                    color: "#ffffff !important",
                    fontWeight: "bold",
                  },

                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              />
            </Stack>
          </div>
        </>
      ) : (
        <h2 className="text-3xl text-center py-20 text-gray-500">
          Book Not found
        </h2>
      )}
    </div>
  );
};

export default Books;
