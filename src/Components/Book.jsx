import React from "react";
import { Link } from "react-router";

const Book = ({ book }) => {
  console.log(book);
  return (
    <div>
      <div className="max-w-sm mx-auto">
        <div className="relative group overflow-hidden rounded-2xl bg-white shadow-sm transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
          {/* Book image */}
          <img
            src={book.image}
            alt={book.bookName}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* top-right badge */}
          <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-lg bg-black bg-opacity-60 text-white">
            {book.category}
          </div>

          {/* Details panel (slides up on hover) */}
          <div className="absolute left-0 right-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-in-out bg-gradient-to-t from-white/95 to-white/80 p-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {book.bookName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">by {book.author}</p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-indigo-600">
                  ৳{book.price}
                </div>
                <div className="text-xs text-gray-500">•</div>
                <div className="text-sm text-yellow-600 font-medium">
                  {book.rating}★
                </div>
              </div>

              <Link
                to={`/book-details/${book._id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition cursor-pointer"
                aria-label={`View details of ${book.bookName}`}
              >
                View
              </Link>
            </div>

            <p className="text-sm text-gray-700 mt-3 line-clamp-3">
              {book.description}
            </p>
          </div>

          {/* subtle overlay for better contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Book;
