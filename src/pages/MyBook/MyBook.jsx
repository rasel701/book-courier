import React, { useContext } from "react";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Loading from "../../Components/Loading";

const paginationModel = { page: 0, pageSize: 5 };

const MyBook = () => {
  const { user } = useContext(UserAuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: librarianBooks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-book", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-book/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(librarianBooks);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "bookName", headerName: "Book Name", width: 280 },

    {
      field: "image",
      headerName: "Book Image",
      width: 250,
      renderCell: (params) => (
        <img
          src={params.value}
          className="w-[60px] h-[60px] object-center rounded-full"
          alt=""
        />
      ),
    },

    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 200,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleString()}</span>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      renderCell: (params) => <span>$ {params?.value}</span>,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <>
            <button
              className={`${
                params.row.status === "published"
                  ? "bg-red-500 btn"
                  : "btn bg-blue-500"
              }`}
              onClick={() => handleStageChangeBtn(params.row)}
            >
              {params.row.status === "published" ? "Unpublished" : "Published"}
            </button>

            <Link
              to={`/dashboard/book-edit/${params.row.bookId}`}
              className="btn btn-primary mx-2"
            >
              Edit
            </Link>
          </>
        </>
      ),
    },
  ];

  const rows = librarianBooks.map((item, index) => ({
    id: index + 1,
    bookName: item.bookName,
    image: item.image,
    createdAt: item.createdAt,
    status: item.status,
    price: item.price,
    bookId: item._id,
  }));

  const handleStageChangeBtn = async (bookItem) => {
    const res = await axiosSecure.patch(`/books/${bookItem.bookId}`, bookItem);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={80}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 1 }}
        />
      </Paper>
    </div>
  );
};

export default MyBook;
