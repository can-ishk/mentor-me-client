import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
