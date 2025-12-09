import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router";
import Loading from "../Components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname} />;
  }

  return children;
};

export default ProtectedRoute;
