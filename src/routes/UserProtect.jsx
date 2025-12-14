import React, { useContext } from "react";
import Loading from "../Components/Loading";
import useRole from "../Hooks/useRole";
import { UserAuthContext } from "../ContextAPI/AuthContext";

const UserProtect = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = useContext(UserAuthContext);

  if (isLoading || loading) {
    return <Loading />;
  }

  if (role.role !== "user") {
    return <h2 className="text-4xl text-center">Forbidden User</h2>;
  }

  return children;
};

export default UserProtect;
