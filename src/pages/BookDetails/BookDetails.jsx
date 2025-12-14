import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Rating, Stack, TextField } from "@mui/material";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
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
      book_Name: book.bookName,
      name,
      email,
      mobile,
      address,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
      price: book.price,
    };

    axiosInstance
      .post("/book-order", orderDetails)
      .then((res) => {
        console.log(res);
        toast.success("Order placed successfully");
        refetch();
        handleClose();
        navigate("/dashboard/my-orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [rating, setRating] = useState(0);

  const handleChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewAndRating = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    if (rating === 0) {
      return toast.error("Please select a rating");
    }

    const bookInfo = {
      bookId: id,
      reviewer_name: user?.displayName,
      reviewer_email: user?.email,
      review,
      rating,
      createdAt: new Date(),
    };

    axiosInstance
      .patch("/book-rating-review", bookInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Rating and Review add successfully");
          e.target.reset();
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const location = useLocation();
  console.log(location);
  const handleOrder = () => {
    if (!user) {
      toast.error("Please login in");
      navigate("/login", { state: location.pathname });
      return;
    }
    handleOpen();
  };

  const allreviews = book?.reviews || [];
  let avaRating = 0;

  if (allreviews.length > 0) {
    const sum = allreviews.reduce((acc, curr) => {
      return (acc += curr.rating);
    }, 0);
    avaRating = (sum / allreviews.length).toFixed(1);
  }

  const handleWishListBtn = async () => {
    if (!user) {
      toast.error("Please login in");
      navigate("/login", { state: location.pathname });
      return;
    }
    const res = await axiosInstance.patch(
      `/user-wishlist/${user?.email}`,
      book
    );
    if (res.data.modifiedCount > 0) {
      toast.success("Book added to wishlist!");
    }
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

              <div className="flex items-center gap-4 mt-4 flex-col sm:flex-row">
                <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                  {book.status}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  ৳ {book.price}
                </span>
                <div className="">
                  {isOrder.includes(user?.email) ? (
                    <form onSubmit={handleReviewAndRating}>
                      <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Your Review
                        </h3>
                        <textarea
                          className="w-full text-black p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Write your review..."
                          name="review"
                          rows={3}
                          required
                        ></textarea>
                        <div className="flex items-center gap-4 mt-2">
                          <label className="flex items-center gap-1">
                            <span className="text-black">Rating:</span>
                            <Rating
                              name="half-rating"
                              precision={0.5}
                              value={rating}
                              onChange={handleChange}
                            />
                          </label>

                          <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
                          >
                            Submit
                          </button>
                        </div>
                        <p>User Rating: {rating}</p>
                        <div className="ml-auto flex flex-col sm:flex-row items-center gap-2 text-yellow-500 font-semibold">
                          <span>Average Rating:</span>
                          <Rating
                            name="half-rating-read"
                            value={Number(avaRating)}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="ml-auto flex flex-col sm:flex-row items-center gap-2 text-yellow-500 font-semibold">
                      <span>Average Rating:</span>
                      <Rating
                        name="half-rating-read"
                        value={Number(avaRating)}
                        precision={0.5}
                        readOnly
                      />
                    </div>
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
                onClick={handleOrder}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Order Now
              </button>
              <button
                onClick={handleWishListBtn}
                className="btn btn-secondary mx-9"
              >
                WishList
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">
            Reviews & Ratings - {allreviews.length}
          </h2>
          <div className="flex flex-col gap-4">
            {/* Example Review Card */}

            {book?.reviews?.map((item, index) => (
              <div key={index} className="bg-gray-300 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {item?.reviewer_name}
                  </h3>
                  <span className="text-yellow-500 font-semibold">
                    <Rating
                      name="half-rating-read"
                      defaultValue={item?.rating}
                      precision={0.5}
                      readOnly
                    />
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{item?.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
