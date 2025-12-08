import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const paginationModel = { page: 0, pageSize: 5 };

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserAuthContext);

  const {
    data: myorders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myorder", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-order/${user?.email}`);
      return res.data;
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Book Title", width: 280 },

    {
      field: "orderDate",
      headerName: "Order Date",
      width: 250,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleString()}</span>
      ),
    },
    {
      field: "status",
      headerName: "status",
      width: 150,
      renderCell: (params) => (
        <span
          className={`${
            params.value === "cancel" ? "text-red-500" : "text-green-500"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "payment status",
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <>
            <button
              disabled={params.row.status === "cancel"}
              className="btn btn-error mx-3"
              onClick={() => handleCancel(params.row)}
            >
              Cancel
            </button>
            <button
              disabled={params.row.status === "cancel"}
              className="btn btn-primary"
              onClick={() => handlePayNow(params.row)}
            >
              Pay Now
            </button>
          </>
        </>
      ),
    },
  ];

  console.log(myorders);

  const rows = myorders.map((item, index) => ({
    id: index + 1,
    title: item.book_Name || "No Book",
    orderDate: item.createdAt,
    status: item.status,
    paymentStatus: item.paymentStatus,
    bookId: item.bookId,
    orderId: item._id,
  }));

  const handleCancel = (orderItem) => {
    console.log("Cancel Order:", orderItem);
    axiosSecure
      .patch(`/book-order-cancel/${orderItem.orderId}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Oreder Cancel Successfully");
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayNow = (id) => {
    console.log("Pay Now for:", id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 1 }}
        />
      </Paper>
    </div>
  );
};

export default MyOrders;
