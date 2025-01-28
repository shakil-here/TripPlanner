import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState({
    name: "",
    startLocation: "",
    tripPlace: "",
    price: "",
    duration: "",
    hotelType: "",
    foodInclude: false,
    tourGuide: false,
    transportType: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch package details on component mount
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/packages/${id}`
        );
        setPackageDetails({
          ...response.data,
          startDate: response.data.startDate?.split("T")[0] || "",
          endDate: response.data.endDate?.split("T")[0] || "",
        });
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch package details. Please try again.");
        setIsLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageDetails({
      ...packageDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:5000/packages/${id}`, packageDetails);
      alert("Package updated successfully!");
      navigate("/manage-packages");
    } catch (err) {
      setError("Failed to update package. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p>Loading package details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Update Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Package Name</label>
            <input
              type="text"
              name="name"
              value={packageDetails.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Start Location</label>
            <input
              type="text"
              name="startLocation"
              value={packageDetails.startLocation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Trip Place</label>
            <input
              type="text"
              name="tripPlace"
              value={packageDetails.tripPlace}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={packageDetails.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={packageDetails.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Hotel Type</label>
            <select
              name="hotelType"
              value={packageDetails.hotelType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Hotel Type</option>
              <option value="3-star">3-Star</option>
              <option value="5-star">5-Star</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Include Food</label>
            <input
              type="checkbox"
              name="foodInclude"
              checked={packageDetails.foodInclude}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block font-medium">Include Tour Guide</label>
            <input
              type="checkbox"
              name="tourGuide"
              checked={packageDetails.tourGuide}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block font-medium">Transport Type</label>
            <select
              name="transportType"
              value={packageDetails.transportType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Transport Type</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={packageDetails.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={packageDetails.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-6 ${
            isUpdating ? "opacity-50" : ""
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Package"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePackage;
