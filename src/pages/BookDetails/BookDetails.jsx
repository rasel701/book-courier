import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack, TextField } from "@mui/material";
import { UserAuthContext } from "../../ContextAPI/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 30,
  p: 4,
  borderRadius: "8px",
};

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserAuthContext);

  const axiosInstance = useAxios();

  const { data: book = {}, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/books/${id}`);
      return res.data;
    },
  });

  const isOrder = book?.orders?.map((item) => item.order_user_email) || [];

  const [open, setOpne] = useState(false);

  const handleOpen = () => setOpne(true);
  const handleClose = () => setOpne(false);

  const handleOrderBook = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const address = e.target.address.value;

    const orderDetails = {
      bookId: id,
      name,
      email,
      mobile,
      address,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    axiosInstance
      .post("/book-order", orderDetails)
      .then((res) => {
        console.log(res);
        refetch();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-black"
          >
            Text in a modal
          </Typography>

          <Stack spacing={2} component="form" onSubmit={handleOrderBook}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              type="text"
              required
              defaultValue={user?.displayName}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              required
              defaultValue={user?.email}
            />

            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              name="mobile"
              type="text"
              required
            />

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              type="text"
              required
            />

            <Button type="submit" variant="contained">
              Place Order{" "}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <div className="max-w-6xl mx-auto p-5">
        {/* Book Info Section */}
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-2xl p-6">
          {/* Book Image */}
          <div className="flex-1">
            <img
              src={book.image}
              alt={book.bookName}
              className="rounded-2xl w-full h-full object-cover shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {book.bookName}
              </h1>
              <p className="text-lg text-gray-600 mt-2">by {book.author}</p>

              <p className="mt-4 text-gray-700">{book.description}</p>

              <div className="flex items-center gap-4 mt-4">
                <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                  {book.status}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  ৳ {book.price}
                </span>
                <div className="ml-auto">
                  {isOrder.includes(user?.email) ? (
                    <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Your Review
                      </h3>
                      <textarea
                        className="w-full text-black p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Write your review..."
                        rows={3}
                      ></textarea>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-1">
                          <span className="text-black">Rating:</span>
                          <select className="border border-gray-300 rounded p-1">
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐⭐</option>
                            <option value="3">3 ⭐⭐⭐</option>
                            <option value="4">4 ⭐⭐⭐⭐</option>
                            <option value="5">5 ⭐⭐⭐⭐⭐</option>
                          </select>
                        </label>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-300">
                          Submit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="ml-auto flex items-center gap-1 text-yellow-500 font-semibold">
                      ⭐ {book.rating}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500 italic">
                Category: {book.category}
              </p>
            </div>

            {/* Order Button */}
            <div className="mt-6">
              <button
                onClick={handleOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Reviews & Ratings
          </h2>
          <div className="flex flex-col gap-4">
            {/* Example Review Card */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">John Doe</h3>
                <span className="text-yellow-500 font-semibold">
                  ⭐⭐⭐⭐⭐
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                Great book! Really helped me understand the topic deeply.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Jane Smith</h3>
                <span className="text-yellow-500 font-semibold">⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600 mt-1">
                Very informative and easy to read.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
