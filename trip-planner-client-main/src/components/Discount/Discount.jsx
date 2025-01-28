import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../Provider/AuthProvider";

const Discount = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation(); // Fetching package details from the previous page
  const [travellers, setTravellers] = useState(1);
  const [finalCost, setFinalCost] = useState(0);
  const [baseCost, setBaseCost] = useState(state.selectedPackage.price);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const packageDetails = state.selectedPackage;

  const handleTravellerChange = (e) => {
    setTravellers(e.target.value);
  };

  const handleCalculateDiscount = async () => {
    try {
      const response = await fetch("http://localhost:5000/calculate-discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageDetails.id,
          travellers: travellers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate discount");
      }

      const data = await response.json();
      setBaseCost(data.baseCost);
      setFinalCost(data.finalPrice);
      setDiscountAmount(data.discountAmount);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/book-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageDetails.id,
          travellers: travellers,
          finalCost: finalCost,
          packageName: packageDetails.name,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to confirm booking");
      }

      alert("Booking confirmed successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Package: {packageDetails.name}
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          Price per person:{" "}
          <span className="font-bold text-blue-600">
            {packageDetails.price}
          </span>
        </p>

        {/* Additional Package Details */}
        <div className="mb-6">
          <p className="text-lg text-gray-600 mb-2">
            Duration: <span className="font-bold text-gray-800">5 days</span>
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Hotel Category:{" "}
            <span className="font-bold text-gray-800">5-star</span>
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Transportation Type:{" "}
            <span className="font-bold text-gray-800">Boat</span>
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Tour Guide: <span className="font-bold text-gray-800">Yes</span>
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Food Included: <span className="font-bold text-gray-800">Yes</span>
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Route:{" "}
            <span className="font-bold text-gray-800">
              Khulna to Sundarbans
            </span>
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="travellers" className="text-gray-700 font-medium">
            Number of Travellers
          </label>
          <input
            type="number"
            id="travellers"
            value={travellers}
            onChange={handleTravellerChange}
            min="1"
            className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter number of travellers"
          />
        </div>

        <button
          onClick={handleCalculateDiscount}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Calculate Total Cost
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Discount Details"
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Discount Details
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              Base Cost for {travellers} traveller(s):{" "}
              <span className="font-bold text-green-600">{baseCost}</span>
            </p>
            <p className="text-lg text-gray-700 mb-2">
              Discount Amount:{" "}
              <span className="font-bold text-yellow-600">
                {discountAmount}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Final Cost after Discount:{" "}
              <span className="font-bold text-red-600">{finalCost}</span>
            </p>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Discount;
