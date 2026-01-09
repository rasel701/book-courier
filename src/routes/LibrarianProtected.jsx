import React, { useContext } from "react";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";
import { UserAuthContext } from "../ContextAPI/AuthContext";

const LibrarianProtected = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = useContext(UserAuthContext);

 

  if (isLoading || loading) {
    return <Loading />;
  }

  if (role.role !== "librarian") {
    return <h2 className="text-4xl text-center">Forbidden User</h2>;
  }

  return children;
};

export default LibrarianProtected;
