import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewPackage = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/packages/category/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id]);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  const handleBooking = () => {
    // When 'Book Now' is clicked, redirect to /discount page with selected package data
    navigate("/discount-cost", { state: { selectedPackage } });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={pkg.imageURL}
              alt={pkg.name}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">
              Route : {pkg.startLocation} to {pkg.tripPlace}
            </p>
            <p className="text-gray-700 font-semibold mb-2">
              Price: {pkg.price}
            </p>
            <p className="text-gray-700 font-semibold mb-2">
              Duration: {pkg.duration} days
            </p>
            <button
              onClick={() => openModal(pkg)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedPackage.name}</h2>
            <img
              src={selectedPackage.imageURL}
              alt={selectedPackage.name}
              className="rounded-lg mb-4"
            />
            <p className="mb-2">Description: {selectedPackage.description}</p>
            <p className="mb-2">Price: {selectedPackage.price}</p>
            <p className="mb-2">Duration: {selectedPackage.duration} days</p>

            <p className="mb-2">Hotel Category: {selectedPackage.hotelType}</p>
            <p className="mb-2">
              Trasportation Type : {selectedPackage.transportType}
            </p>
            <p className="mb-2">
              Tour Guide: {selectedPackage.tourGuide ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              Food Included: {selectedPackage.foodIncluded ? "Yes" : "No"}
            </p>

            <p className="mb-2">
              Route: {selectedPackage.startLocation} to{" "}
              {selectedPackage.tripPlace}
            </p>
            <button
              onClick={handleBooking}
              className="bg-green-600 text-white px-6 py-2 rounded-full mr-4"
            >
              Book Now
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPackage;
