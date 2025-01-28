import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    groupSize: "",
    duration: "",
    discountType: "",
    hotelType: "",
  });

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle input changes for search filters
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Perform the search
  const handleSearch = (e) => {
    e.preventDefault();

    // Show SweetAlert before fetching the search results
    Swal.fire({
      title: "Searching...",
      text: "Please wait while we fetch the search results.",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch("http://localhost:5000/search-packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.packages || []);
        // Close the SweetAlert and show success message
        Swal.close();
        Swal.fire({
          title: "Search Results",
          text: "The search results have been fetched successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "There was an issue fetching the search results. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error fetching search results:", err);
      });
  };

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <section
        id="search"
        className="py-16 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Find Your Perfect Trip
          </h2>
          <p className="text-gray-600 mb-10">
            Use any combination of filters to find the trip that suits you best.
          </p>
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white shadow-md rounded-lg"
            onSubmit={handleSearch}
          >
            <div>
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-gray-700 font-medium mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="minPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="e.g., 1000"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="groupSize"
                className="block text-gray-700 font-medium mb-2"
              >
                Group Size
              </label>
              <input
                type="number"
                name="groupSize"
                id="groupSize"
                value={filters.groupSize}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-gray-700 font-medium mb-2"
              >
                Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={filters.duration}
                onChange={handleInputChange}
                placeholder="e.g., 7"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="discountType"
                className="block text-gray-700 font-medium mb-2"
              >
                Discount Type
              </label>
              <select
                name="discountType"
                id="discountType"
                value={filters.discountType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Group Size">Group Size</option>
                <option value="Duration">Duration</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="hotelType"
                className="block text-gray-700 font-medium mb-2"
              >
                Hotel Type
              </label>
              <select
                name="hotelType"
                id="hotelType"
                value={filters.hotelType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="3-star">3-Star</option>
                <option value="5-star">5-Star</option>
              </select>
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <section id="search-results" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((packageItem) => (
                <div
                  key={packageItem.package_id}
                  className="bg-blue-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <img
                    src={packageItem.imageURL}
                    alt={packageItem.package_name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-4">
                    {packageItem.package_name}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {packageItem.description}
                  </p>
                  <p className="text-gray-700 mb-4">
                    Price: ${packageItem.price} | Duration:{" "}
                    {packageItem.duration} days
                  </p>
                  <Link
                    to={`/packages/${packageItem.package_id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trip Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Trip Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-blue-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-4">{category.name}</h3>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <Link
                  to={`/packages/${category.id}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                >
                  View Packages
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Trip Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
