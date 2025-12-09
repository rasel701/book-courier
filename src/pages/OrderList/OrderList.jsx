import React from "react";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

const OrderList = () => {
  const { role } = useRole();
  console.log(role);
  const axiosSecure = useAxiosSecure();

  const { data: orderData = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-book/${role.email}`);
      return res.data;
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "bookName", headerName: "Book Name", width: 200 },

    {
      field: "image",
      headerName: "Book Image",
      width: 170,
      renderCell: (params) => (
        <img
          src={params.value}
          className="w-[60px] h-[60px] object-center rounded-full"
          alt=""
        />
      ),
    },

    {
      field: "customarName",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params) => <span>{params.value}</span>,
    },

    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 200,
      renderCell: (params) => <span>{params.value}</span>,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => <span>$ {params?.value}</span>,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => <span> {params?.value}</span>,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 140,
      renderCell: (params) => <span> {params?.value}</span>,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 200,
      renderCell: (params) => (
        <span> {new Date(params?.value).toLocaleString()}</span>
      ),
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
          </>
        </>
      ),
    },
  ];

  const rows = orderData.map((data, index) => ({
    id: index + 1,
    bookName: data.bookName,
    image: data.image,
    customarName: data.bookOrderDetails.name,
    customerEmail: data.bookOrderDetails.email,
    price: data.price,
    paymentStatus: data.bookOrderDetails.paymentStatus,
    orderStatus: data.bookOrderDetails.status,
    orderDate: data.bookOrderDetails.createdAt,
  }));

  console.log(orderData);
  return (
    <div>
      <h2>This is a order list page</h2>
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
    </div>
  );
};

export default OrderList;
