import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";

const UserDashboardHome = () => {
  const { user } = useContext(UserAuthContext);
  const axiosInstance = useAxios();

  const {
    data: books = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["freeBook"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "https://gutendex.com/books/?language=en&limit=1"
      );
      return res.data;
    },
  });

  const booksData = books?.results || [];
  const displayedBooks = booksData.slice(0, 8);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold text-xl">
        Error fetching books. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-500 text-center">
          Welcome {user?.displayName || "User"} to your Dashboard! 👋
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Get a quick overview of your library activities.
        </p>
      </div>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Free English Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {displayedBooks?.map((book) => {
              console.log(book.formats?.["text/html"]);

              return (
                <div
                  key={book.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  {book.formats?.["image/jpeg"] && (
                    <img
                      src={book.formats["image/jpeg"]}
                      alt={book.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}

                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    {book.authors?.length > 0
                      ? book.authors.map((a) => a.name).join(", ")
                      : "Unknown Author"}
                  </p>

                  <a
                    href={book.formats?.["text/html"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                  >
                    Read Free
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardHome;
