import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [barStats, setBarStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BAR_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28DFF",
    "#FF6347",
    "#6A5ACD",
    "#3CB371",
  ];
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d084f3",
    "#f38784",
    "#ff69b4",
    "#ff4500",
    "#32cd32",
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch pie chart data
        const pieResponse = await axios.get(
          "http://localhost:5000/admin-stats",
          {
            withCredentials: true,
          }
        );
        setStats(pieResponse.data);

        // Fetch bar chart data
        const barResponse = await axios.get(
          "http://localhost:5000/bar-chart-stats",
          {
            withCredentials: true,
          }
        );
        setBarStats(barResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  // Prepare data for the Pie Chart (use barStats data here)
  const pieData = [
    { name: "Total Users", value: stats.totalUsers },
    { name: "Total Packages", value: stats.totalPackages },
    {
      name: "Top Destinations",
      value: barStats.topDestinations.count,
      label: `${barStats.topDestinations.tripPlace} (${barStats.topDestinations.count} trips)`,
    },
    { name: "Bookings (7 Days)", value: barStats.bookingsLast7Days },
    { name: "Confirmed Packages", value: stats.confirmedPackages },
    { name: "Pending Packages", value: stats.pendingPackages },
    { name: "Completed Packages", value: stats.completedPackages },
  ];

  // Prepare data for the Bar Chart (use stats data here)
  const barData = [
    { name: "Total Revenue", value: barStats.totalRevenue },
    { name: "Avg Booking Price", value: barStats.avgPrice },
    { name: "Pending Revenue", value: barStats.pendingRevenue },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient">
        Travel Dashboard
      </h1>

      {/* Pie Chart */}
      <div className="flex mb-12">
        <div className="w-1/2 mr-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Travel Stats Overview
          </h2>
          <PieChart width={500} height={500}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label={(entry) => (entry.label ? entry.label : entry.name)}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-center mb-4">
            Travel Performance Summary
          </h2>
          <table className="min-w-full table-auto shadow-lg border-collapse border rounded-lg overflow-hidden bg-gradient-to-r from-blue-200 via-green-200 to-teal-200">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="px-6 py-2 text-left">Field</th>
                <th className="px-6 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {pieData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.label || item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex mb-12">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-center mb-4">
            Booking & Revenue Breakdown
          </h2>
          <BarChart
            width={600}
            height={300}
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[10000, 50000]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {barData.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-center mb-4">
            Travel Revenue Analysis
          </h2>
          <table className="min-w-full table-auto shadow-lg border-collapse border rounded-lg overflow-hidden bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200">
            <thead>
              <tr className="bg-orange-700 text-white">
                <th className="px-6 py-2 text-left">Field</th>
                <th className="px-6 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {barData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
