import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import Rating from "react-rating";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Review = () => {
  const [completedPackages, setCompletedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Fetch Completed Packages
  useEffect(() => {
    const fetchCompletedPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/completed-packages",
          {
            withCredentials: true,
          }
        );
        setCompletedPackages(response.data.completedPackages);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews", {
          withCredentials: true,
        });
        setReviews(response.data.reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchCompletedPackages();
    fetchReviews();
  }, []);

  // Open Modal
  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setReview("");
    setRating(0);
  };

  // Handle Review Submission
  const handleSubmitReview = () => {
    if (!review || rating <= 0) {
      Swal.fire("Error", "Please provide a valid review and rating.", "error");
      return;
    }

    axios
      .post(
        "http://localhost:5000/submit-review",
        {
          booking_id: selectedPackage.booking_id,
          package_id: selectedPackage.id,
          reviewText: review,
          rating,
        },
        { withCredentials: true }
      )
      .then(() => {
        Swal.fire("Success", "Review submitted successfully!", "success");
        closeModal();
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        Swal.fire("Error", "Failed to submit the review.", "error");
      });
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Completed Packages
      </h1>

      {/* Completed Packages Cards */}
      {completedPackages.length === 0 ? (
        <p className="text-center text-lg">No completed packages available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedPackages.map((pkg) => (
            <div
              key={pkg.booking_id}
              className="border rounded-lg shadow-xl p-6 bg-white hover:bg-gray-50 transition-all duration-300 text-center"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 hover:underline cursor-pointer">
                {pkg.name}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Route:</strong> {pkg.startLocation} to {pkg.tripPlace}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Start Date:</strong>{" "}
                {new Date(pkg.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>End Date:</strong>{" "}
                {new Date(pkg.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Travellers:</strong> {pkg.travellers}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Total Cost:</strong> {pkg.total_cost} Taka
              </p>
              <button
                onClick={() => openModal(pkg)}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700"
              >
                Write a Review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-gray-900 mb-4"
                  >
                    Write a Review for{" "}
                    <span className="text-blue-600">
                      {selectedPackage?.name}
                    </span>
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      placeholder="Write your review..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (1-5)
                      </label>
                      <Rating
                        initialRating={rating}
                        onChange={(rate) => setRating(rate)}
                        emptySymbol="far fa-star text-gray-300 text-2xl"
                        fullSymbol="fas fa-star text-yellow-500 text-2xl"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                      onClick={handleSubmitReview}
                    >
                      Submit Review
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* All Reviews Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-center mb-8">All Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-center text-lg">No reviews available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border text-center">
                    Reviewer Name
                  </th>
                  <th className="px-6 py-3 border text-center">Package Name</th>
                  <th className="px-6 py-3 border text-center">Route</th>
                  <th className="px-6 py-3 border text-center">Review</th>
                  <th className="px-6 py-3 border text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="text-center">
                    <td className="px-6 py-4 border">{review.reviewer_name}</td>
                    <td className="px-6 py-4 border text-blue-600 font-semibold hover:underline cursor-pointer">
                      {review.package_name}
                    </td>
                    <td className="px-6 py-4 border">
                      {review.startLocation} to {review.tripPlace}
                    </td>
                    <td className="px-6 py-4 border">{review.review_text}</td>
                    <td className="px-6 py-4 border">
                      <Rating
                        initialRating={review.ratings}
                        readonly
                        emptySymbol="far fa-star text-gray-300 text-2xl"
                        fullSymbol="fas fa-star text-yellow-500 text-2xl"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
