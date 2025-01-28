import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa"; // Import the default user icon from react-icons

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext); // Add loading state
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout().catch((error) => console.error(error.message));
  };

  // Toggle the dropdown state
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally, display a loading spinner or message
  }

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left Side: Trip Planner */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Hamburger Icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-white text-2xl font-bold tracking-wide">
              Trip Planner
            </div>
          </div>

          {/* Navbar Links */}
          <div
            className={`flex ${
              menuOpen ? "block" : "hidden"
            } sm:flex space-x-4`}
          >
            <NavLink
              to="/"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
              activeClassName="bg-purple-700"
            >
              Home
            </NavLink>
            <NavLink
              to="/booking"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
              activeClassName="bg-purple-700"
            >
              Booking
            </NavLink>
            <NavLink
              to="/packages"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
              activeClassName="bg-purple-700"
            >
              Packages
            </NavLink>
            {/* <NavLink
              to="/discount"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
              activeClassName="bg-purple-700"
            >
              Discount
            </NavLink> */}
            <NavLink
              to="/reviews"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
              activeClassName="bg-purple-700"
            >
              Reviews
            </NavLink>

            {/* Admin Features */}
            {user && user.role === "admin" && (
              <div className="relative">
                <button
                  onClick={toggleDropdown} // Use the toggleDropdown function here
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-400 transition duration-300"
                >
                  Admin
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <NavLink
                      to="/admin-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Admin Dashboard
                    </NavLink>
                    <NavLink
                      to="/add-packages"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Add Packages
                    </NavLink>
                    <NavLink
                      to="/manage-packages"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Manage Packages
                    </NavLink>
                    <NavLink
                      to="/manage-users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Manage Users
                    </NavLink>
                    <NavLink
                      to="/booking-list"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Booking List
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Authentication/Profile Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-white bg-green-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-gray-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Default User Icon (if no photoURL) */}
                <div className="w-10 h-10 bg-gray-300 text-white flex items-center justify-center rounded-full">
                  {!user.photoURL ? (
                    <FaUserCircle className="w-8 h-8 text-white" />
                  ) : (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
