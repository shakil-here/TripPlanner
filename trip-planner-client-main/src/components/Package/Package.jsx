import React, { useState } from "react";
import axios from "axios";

const Package = () => {
  const [formData, setFormData] = useState({
    trip_route: "", // Replacing start_location and destination with trip_route
    duration: "",
    hotel_type: "3-star",
    travelers: "",
    transport_type: "Bus",
    food_included: "Yes",
    tour_guide: "Yes",
    room_count: "",
  });
  const [totalPrice, setTotalPrice] = useState(null); // For storing the total price
  const [error, setError] = useState(null); // For error handling

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to create the package
      const response = await axios.post(
        "http://localhost:5000/api/packages",
        formData
      );
      if (response.status === 200) {
        alert("Package added successfully!");

        // After package is created, fetch the total price
        console.log(response.data);
        const customId = response.data.custom_id; // assuming the backend returns the custom_id
        console.log("customId : ", customId);
        const priceResponse = await axios.get(
          `http://localhost:5000/calculate-price/${customId}`
        );

        // Set the total price fetched from backend
        setTotalPrice(priceResponse.data.total_price);
      }
    } catch (error) {
      console.error("There was an error adding the package!", error);
      setError(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Custom Package
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Trip Route */}
          <div className="form-control">
            <label htmlFor="trip_route" className="label">
              <span className="label-text">Trip Route</span>
            </label>
            <select
              id="trip_route"
              name="trip_route"
              value={formData.trip_route}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Trip Route</option>
              <option value="Dhaka-Cox's Bazar">Dhaka-Cox's Bazar</option>
              <option value="Bogura-Cox's Bazar">Bogura-Cox's Bazar</option>
              <option value="Dhaka-Sylhet">Dhaka-Sylhet</option>
              <option value="Chittagong-Sundarbans">
                Chittagong-Sundarbans
              </option>
              {/* Add more trip routes as per your requirement */}
            </select>
          </div>

          {/* Duration */}
          <div className="form-control">
            <label htmlFor="duration" className="label">
              <span className="label-text">Duration (Days)</span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Hotel Type */}
          <div className="form-control">
            <label htmlFor="hotel_type" className="label">
              <span className="label-text">Hotel Type</span>
            </label>
            <select
              id="hotel_type"
              name="hotel_type"
              value={formData.hotel_type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="3-star">3-star</option>
              <option value="5-star">5-star</option>
            </select>
          </div>

          {/* Travelers */}
          <div className="form-control">
            <label htmlFor="travelers" className="label">
              <span className="label-text">Number of Travelers</span>
            </label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Transport Type */}
          <div className="form-control">
            <label htmlFor="transport_type" className="label">
              <span className="label-text">Transport Type</span>
            </label>
            <select
              id="transport_type"
              name="transport_type"
              value={formData.transport_type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Boat">Boat</option> {/* Added Boat option */}
            </select>
          </div>

          {/* Food Included */}
          <div className="form-control">
            <label htmlFor="food_included" className="label">
              <span className="label-text">Food Included</span>
            </label>
            <select
              id="food_included"
              name="food_included"
              value={formData.food_included}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Tour Guide */}
          <div className="form-control">
            <label htmlFor="tour_guide" className="label">
              <span className="label-text">Tour Guide</span>
            </label>
            <select
              id="tour_guide"
              name="tour_guide"
              value={formData.tour_guide}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Room Count */}
          <div className="form-control">
            <label htmlFor="room_count" className="label">
              <span className="label-text">Number of Rooms</span>
            </label>
            <input
              type="number"
              id="room_count"
              name="room_count"
              value={formData.room_count}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit Package
            </button>
          </div>
        </div>
      </form>

      {/* Display Total Price */}
      {totalPrice !== null && (
        <div className="mt-4">
          <h3 className="text-xl">Total Price: {totalPrice}</h3>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Package;
