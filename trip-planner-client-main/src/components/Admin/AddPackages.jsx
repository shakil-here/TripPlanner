import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPackages = () => {
  const [packageData, setPackageData] = useState({
    imageUrl: "",
    name: "",
    startLocation: "",
    tripPlace: "",
    price: "",
    duration: "",
    hotelType: "",
    foodIncluded: false,
    tourGuide: false,
    transportType: "",
    startDate: "",
    endDate: "",
    description: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories"); // Update URL as per your backend setup
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({
      ...packageData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/packages", // Adjust the URL if needed
        packageData
      );
      console.log("Package added successfully:", response.data);
      alert("Package added successfully!");
      setPackageData({
        imageUrl: "",
        name: "",
        startLocation: "",
        tripPlace: "",
        price: "",
        duration: "",
        hotelType: "",
        foodIncluded: false,
        tourGuide: false,
        transportType: "",
        startDate: "",
        endDate: "",
        description: "",
        category_id: "",
      });
    } catch (error) {
      console.error("Error adding package:", error);
      console.log(category_id);
      alert("Failed to add package. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Add a New Package
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={packageData.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Package Name
          </label>
          <input
            type="text"
            name="name"
            value={packageData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Start Location
          </label>
          <input
            type="text"
            name="startLocation"
            value={packageData.startLocation}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Trip Place</label>
          <input
            type="text"
            name="tripPlace"
            value={packageData.tripPlace}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Duration (in days)
          </label>
          <input
            type="number"
            name="duration"
            value={packageData.duration}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Hotel Type</label>
          <select
            name="hotelType"
            value={packageData.hotelType}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select Hotel Type</option>
            <option value="3 Star">3 Star</option>
            <option value="5 Star">5 Star</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Food Included
          </label>
          <input
            type="checkbox"
            name="foodIncluded"
            checked={packageData.foodIncluded}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Tour Guide</label>
          <input
            type="checkbox"
            name="tourGuide"
            checked={packageData.tourGuide}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Transport Type
          </label>
          <select
            name="transportType"
            value={packageData.transportType}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select Transport Type</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Boat">Boat</option>
            <option value="Flight">Flight</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={packageData.startDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={packageData.endDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={packageData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            value={packageData.category_id}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option value={1}> 1</option>
            <option value={2}> 2</option>
            <option value={3}> 3</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
