import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ViewPackage from "./components/ViewPackages/ViewPackages";
import Booking from "./components/Booking/Booking";
import Package from "./components/Package/Package";
import Discount from "./components/Discount/Discount";
import AuthProvider from "./components/Provider/AuthProvider";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Admin from "./components/Admin/Admin";
import PrivateRoute from "./components/Private/PrivateRoute";
import ManagePackages from "./components/ManagePackages/ManagePackages";
import UpdatePackage from "./components/UpdatePackage/UpdatePackage";
import AddPackages from "./components/Admin/AddPackages";
import BookingList from "./components/Admin/BookingList";
import Review from "./components/Review/Review";
import ManageUsers from "./components/Admin/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/packages/:id",
        element: (
          <PrivateRoute>
            <ViewPackage></ViewPackage>
          </PrivateRoute>
        ),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Booking></Booking>
          </PrivateRoute>
        ),
      },
      {
        path: "/packages",
        element: (
          <PrivateRoute>
            <Package></Package>
          </PrivateRoute>
        ),
      },
      {
        path: "/discount-cost",
        element: (
          <PrivateRoute>
            {" "}
            <Discount></Discount>
          </PrivateRoute>
        ),
      },
      {
        path: "/reviews",
        element: (
          <PrivateRoute>
            {" "}
            <Review></Review>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute role="admin">
            <Admin></Admin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-packages",
        element: (
          <ProtectedRoute role="admin">
            <ManagePackages></ManagePackages>
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-package/:id",
        element: (
          <ProtectedRoute role="admin">
            <UpdatePackage></UpdatePackage>
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-packages",
        element: (
          <ProtectedRoute role="admin">
            <AddPackages></AddPackages>
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking-list",
        element: (
          <ProtectedRoute role="admin">
            <BookingList></BookingList>
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-users",
        element: (
          <ProtectedRoute role="admin">
            <ManageUsers></ManageUsers>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
