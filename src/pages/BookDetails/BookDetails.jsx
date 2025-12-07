import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const BookDetails = () => {
  const { id } = useParams();

  const axiosInstance = useAxios();

  const { data: book = {} } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/books/${id}`);
      return res.data;
    },
  });

  console.log(book);

  return (
    <div>
      <h3>This is a book details page</h3>
    </div>
  );
};

export default BookDetails;
