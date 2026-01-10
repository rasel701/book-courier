import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const FreeBooks = () => {
  const axiosInstance = useAxios();
  const {
    data: books = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["freeBook"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "https://gutendex.com/books/?language=en&limit=8"
      );
      return res.data;
    },
  });

  const booksData = books?.results || [];
  const displayedBooks = booksData.slice(0, 8);

  const SkeletonCard = () => (
    <div className="bg-white p-4 rounded-2xl shadow-sm animate-pulse">
      <div className="w-full h-56 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500">
        <p className="font-bold text-xl">Oops! Error fetching books.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-600 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Explore <span className="text-blue-600">Free Books</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : displayedBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Book Cover */}
                  <div className="relative overflow-hidden rounded-xl mb-5">
                    {book.formats?.["image/jpeg"] ? (
                      <img
                        src={book.formats["image/jpeg"]}
                        alt={book.title}
                        className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400">
                        No Cover
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {book.authors?.length > 0
                        ? book.authors[0].name.split(",").reverse().join(" ")
                        : "Anonymous"}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <a
                      href={book.formats?.["text/html"] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 bg-blue-600 hover:bg-gray-900 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg shadow-blue-200 hover:shadow-none"
                    >
                      Read Now
                    </a>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FreeBooks;
