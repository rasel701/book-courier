import React from "react";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Loading from "../../Components/Loading";
import { MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const paginationModel = { page: 0, pageSize: 5 };

const OrderList = () => {
  const { role } = useRole();
  console.log(role);
  const axiosSecure = useAxiosSecure();

  const {
    data: orderData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orederData", role?.email],
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
      width: 200,
      renderCell: (params) => {
        const status = params.row.orderStatus;
        const payment = params.row.paymentStatus;

        if (payment !== "paid" && status !== "cancel") {
          return (
            <span style={{ color: "red", fontWeight: 600 }}>
              Payment Pending
            </span>
          );
        }

        let options = [];
        if (status === "pending") {
          options = ["pending", "shipped"];
        } else if (status === "shipped") {
          options = ["shipped", "delivered"];
        } else {
          // delivered হলে dropdown না দেখিয়ে শুধু text দেখাবে
          return <span>{status}</span>;
        }

        return (
          <Select value={status} onChange={(e) => handleChange(e, params.row)}>
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        );
      },
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
              onClick={() => handleCancelOreder(params.row)}
              disabled={
                params.row.paymentStatus === "paid" ||
                params.row.orderStatus === "cancel"
              }
              className={`btn mx-3 ${
                params.row.status === "cancel" ||
                params.row.paymentStatus === "paid"
                  ? "opacity-70 cursor-not-allowed bg-gray-500 text-white"
                  : "btn-primary"
              }`}
            >
              Cancel
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
    customarName: data.bookOrderDetails?.name,
    customerEmail: data.bookOrderDetails?.email,
    price: data.price,
    paymentStatus: data.bookOrderDetails?.paymentStatus,
    orderStatus: data.bookOrderDetails?.status,
    orderDate: data.bookOrderDetails?.createdAt,
    orderId: data.bookOrderDetails?._id,
  }));

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = async (e, bookInfo) => {
    const newStatus = e.target.value;
    console.log(newStatus);

    const res = await axiosSecure.patch(
      `/book-order-status/${bookInfo.orderId}?status=${newStatus}`
    );
    if (res.data.modifiedCount > 0) {
      toast.success("Order status updated!");
      refetch();
    }
    console.log(res.data);
  };

  const handleCancelOreder = async (bookInfo) => {
    console.log(bookInfo);

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(
      `/book-order-cancel/${bookInfo.orderId}`
    );
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Cancelled!",
        text: "Order has been cancelled successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

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
