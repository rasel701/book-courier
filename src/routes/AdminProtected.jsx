import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";

const AdminProtected = ({ children }) => {
  const { loading } = useContext(UserAuthContext);
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loading />;
  }

  // check role after loading complete
  if (role.role !== "admin") {
    return <h2 className="text-4xl text-center">Forbidden User</h2>;
  }

  return children;
};

export default AdminProtected;
