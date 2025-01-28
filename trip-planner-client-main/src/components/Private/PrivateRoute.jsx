import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider"; // Import the context, not the provider

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Use AuthContext here

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
