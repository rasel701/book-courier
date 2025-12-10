import React, { useContext } from "react";
import { UserAuthContext } from "../ContextAPI/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router";
import Loading from "../Components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(loading);

  console.log(location);
  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname} />;
  }

  return children;
};

export default ProtectedRoute;
