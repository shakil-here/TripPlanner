import React, { useState, useEffect } from "react";
import axios from "axios";
import "animate.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all packages from the database
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/manage-packages"
        ); // Replace with your API endpoint
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  // Handle delete package
  const handleDelete = async (packageId) => {
    console.log(packageId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/manage-packages/${packageId}`
        ); // Replace with your API endpoint
        setPackages(packages.filter((pkg) => pkg.id !== packageId));
        alert("Package deleted successfully!");

        // Close the modal if the deleted package was being viewed
        setSelectedPackage(null);
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  // Handle update package (open modal or form)
  const handleUpdate = (packageId) => {
    navigate(`/update-package/${packageId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded p-4 shadow hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
            <p>
              <strong>Start:</strong> {pkg.startLocation}
            </p>
            <p>
              <strong>Destination:</strong> {pkg.tripPlace}
            </p>
            <p>
              <strong>Price:</strong> {pkg.price} Taka
            </p>

            <button
              onClick={() => setSelectedPackage(pkg)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-3 mr-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-2xl overflow-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4">
              {selectedPackage.name} Details
            </h2>
            <img
              src={selectedPackage.imageURL}
              alt={selectedPackage.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-4">
              <p>
                <strong>Start Location:</strong> {selectedPackage.startLocation}
              </p>
              <p>
                <strong>Destination:</strong> {selectedPackage.tripPlace}
              </p>
              <p>
                <strong>Price:</strong> {selectedPackage.price} Taka
              </p>
              <p>
                <strong>Duration:</strong> {selectedPackage.duration} days
              </p>
              <p>
                <strong>Hotel Type:</strong> {selectedPackage.hotelType}
              </p>
              <p>
                <strong>Food:</strong>{" "}
                {selectedPackage.foodInclude ? "Included" : "Not Included"}
              </p>
              <p>
                <strong>Tour Guide:</strong>{" "}
                {selectedPackage.tourGuide ? "Included" : "Not Included"}
              </p>
              <p>
                <strong>Transport Type:</strong> {selectedPackage.transportType}
              </p>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handleUpdate(selectedPackage.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(selectedPackage.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedPackage(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
