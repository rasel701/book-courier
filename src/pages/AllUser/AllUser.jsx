import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Loading from "../../Components/Loading";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const paginationModel = { page: 0, pageSize: 6 };

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userName", headerName: "User Name", width: 230 },

    {
      field: "userEmail",
      headerName: "User Email",
      width: 230,
      renderCell: (params) => <span>{params.value}</span>,
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      renderCell: (params) => <span>{params?.value}</span>,
    },

    {
      field: "registerDate",
      headerName: "Register Date",
      width: 220,
      renderCell: (params) => (
        <span> {new Date(params?.value).toLocaleString()}</span>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <div className="flex justify-center w-full my-3">
            {params.row.role === "user" ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleChangUser(params.row, "librarian")}
                  className="btn btn-primary"
                >
                  Librarian
                </button>
                <button
                  onClick={() => handleChangUser(params.row, "admin")}
                  className="btn btn-primary"
                >
                  Admin
                </button>
              </div>
            ) : params.row.role === "librarian" ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleChangUser(params.row, "user")}
                  className="btn btn-primary"
                >
                  User
                </button>
                <button
                  onClick={() => handleChangUser(params.row, "admin")}
                  className="btn btn-primary"
                >
                  Admin
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleChangUser(params.row, "user")}
                  className="btn btn-primary"
                >
                  User
                </button>
                <button
                  onClick={() => handleChangUser(params.row, "librarian")}
                  className="btn btn-primary"
                >
                  Librarian
                </button>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];

  const rows = allUsers.map((data, index) => ({
    id: index + 1,
    userName: data?.displayName,
    userEmail: data?.email,
    role: data.role,
    registerDate: data.createdAt,
    userId: data._id,
  }));

  const handleChangUser = async (userInfo, role) => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change role of ${userInfo.userName} to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    const res = await axiosSecure.patch(
      `/user-role-change/${userInfo?.userId}`,
      { role }
    );
    if (res.data.modifiedCount > 0) {
      // Success alert
      Swal.fire("Updated!", `${userInfo.userName} is now a ${role}`, "success");
      refetch();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <Paper sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={80}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[6, 10]}
            checkboxSelection
            sx={{ border: 1 }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default AllUser;
