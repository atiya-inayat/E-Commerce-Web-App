import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  console.log({ user, isAuthChecked });
  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
