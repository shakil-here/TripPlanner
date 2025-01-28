import React, { useState, useEffect } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/get-user-bookings",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        console.log("booking : ", data.bookings);
        setBookings(data.bookings); // Store the bookings data
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchBookings(); // Call the fetchBookings function when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Bookings
        </h2>

        {/* {error && <p className="text-red-600 text-center">{error}</p>} */}

        {bookings.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">Package Name</th>
                <th className="px-4 py-2 text-left">Travellers</th>
                <th className="px-4 py-2 text-left">Total Cost</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Booking Request Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td className="px-4 py-2 border">{booking.booking_id}</td>
                  <td className="px-4 py-2 border">{booking.package_name}</td>
                  <td className="px-4 py-2 border">{booking.travellers}</td>
                  <td className="px-4 py-2 border">{booking.total_cost}</td>
                  <td className="px-4 py-2 border">{booking.status}</td>
                  {/* <td className="px-4 py-2 border">
                    {booking.status === 0 ? "Pending" : "Accepted"}
                  </td> */}
                  <td className="px-4 py-2 border">
                    {new Date(booking.booking_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
