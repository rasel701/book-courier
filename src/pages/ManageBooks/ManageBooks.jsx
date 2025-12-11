import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 10 };
const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allBook = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBook"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  console.log(allBook);

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
      field: "librarianName",
      headerName: "Librarian Name",
      width: 200,
      renderCell: (params) => <span>{params.value}</span>,
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
            <button
              onClick={handleDeleteBtn(params.row)}
              className="btn btn-secondary mx-5"
            >
              Delete
            </button>
          </>
        </>
      ),
    },
  ];

  const rows = allBook?.map((item, index) => ({
    id: index + 1,
    bookName: item.bookName,
    image: item.image,
    createdAt: item.createdAt,
    librarianName: item.librarianName,
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

  const handleDeleteBtn = (bookInfo) => {
    console.log(bookInfo);
  };

  return (
    <div>
      {" "}
      <Paper sx={{ height: 900, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={80}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 10]}
          checkboxSelection
          sx={{ border: 1 }}
        />
      </Paper>
    </div>
  );
};

export default ManageBooks;
