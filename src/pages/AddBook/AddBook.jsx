import React, { useContext } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddBook = () => {
  const { user } = useContext(UserAuthContext);
  const { role } = useRole();
  

  const axiosSecure = useAxiosSecure();

  const handleAddBook = async (e) => {
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
      librarianEmail: user?.email,
      librarianName: user?.displayName,
      librarianId: role?._id,
      createdAt: new Date(),
    };
    

    const res = await axiosSecure.post("/book-add", bookInfo);

    if (res.data.insertedId) {
      toast.success("New Book add Successfully");
      e.target.reset();
    } else {
      toast.error(res.data.message);
      e.target.reset();
    }
  };

  return (
    <div>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 5,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          align="center"
          mb={3}
        >
          Add New Book
        </Typography>

        <Stack spacing={3} component="form" onSubmit={handleAddBook}>
          {/* Book Name */}
          <TextField
            label="Book Name"
            variant="outlined"
            fullWidth
            placeholder="Enter book name"
            required
            name="bookName"
          />

          {/* Author */}
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            placeholder="Enter author name"
            required
            name="author"
          />

          {/* Image Upload */}
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            placeholder="Book Image"
            required
            name="image"
          />

          {/* Status */}
          <TextField
            required
            name="status"
            select
            label="Status"
            defaultValue="published"
            fullWidth
          >
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="unpublished">Unpublished</MenuItem>
          </TextField>

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            placeholder="Enter price"
            required
            name="price"
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter book description"
            required
            name="description"
          />

          {/* Category */}
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            placeholder="Enter category"
            required
            name="category"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Add Book
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default AddBook;
