import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const BookEdit = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(id);
  const { data: book = {}, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });
  console.log(book);

  const handleEditBook = async (e) => {
    e.preventDefault();
    const bookName = e.target.bookName.value;
    const author = e.target.author.value;
    const image = e.target.image.value;
    const status = e.target.status.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const bookInfo = {
      bookName,
      author,
      image,
      status,
      price,
      description,
      category,
    };
    console.log(bookInfo);

    const res = await axiosSecure.patch(`/book-edit/${id}`, bookInfo);
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("Book updated successfully!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-600">
          Add / Edit Book
        </h2>

        <form className="space-y-4" onSubmit={handleEditBook}>
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Book Name
            </label>
            <input
              type="text"
              placeholder="Enter book name"
              className="input input-bordered w-full"
              name="bookName"
              defaultValue={book?.bookName}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Author
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              className="input input-bordered w-full"
              defaultValue={book?.author}
              name="author"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Book Image
            </label>
            <input
              type="text"
              placeholder="Enter image"
              className="input input-bordered w-full"
              name="image"
              defaultValue={book?.image}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Status
            </label>
            <select
              name="status"
              defaultValue={book?.status}
              className="select select-bordered w-full"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Price
            </label>
            <input
              type="text"
              placeholder="Enter price"
              className="input input-bordered w-full"
              name="price"
              defaultValue={book?.price}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Description
            </label>
            <textarea
              placeholder="Enter book description"
              className="textarea textarea-bordered w-full"
              rows={4}
              name="description"
              defaultValue={book?.description}
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              className="input input-bordered w-full"
              name="category"
              defaultValue={book?.category}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
