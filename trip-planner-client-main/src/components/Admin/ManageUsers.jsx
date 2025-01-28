// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:5000/admin/manage-users",
//           {
//             withCredentials: true, // Include cookies for authentication if necessary
//           }
//         );
//         setUsers(response.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-lg">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-lg text-red-600">Error: {error}</p>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-4xl font-bold text-center mb-8">Manage Users</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto shadow-lg border-collapse border rounded-lg">
//           <thead className="bg-blue-700 text-white">
//             <tr>
//               <th className="px-6 py-2 text-left">User ID (CID)</th>
//               <th className="px-6 py-2 text-left">First Name</th>
//               <th className="px-6 py-2 text-left">Last Name</th>
//               <th className="px-6 py-2 text-left">Email</th>
//               <th className="px-6 py-2 text-left">Confirmed Packages</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.user_id} className="hover:bg-gray-100">
//                 <td className="px-6 py-3">{user.user_id}</td>
//                 <td className="px-6 py-3">{user.first_name}</td>
//                 <td className="px-6 py-3">{user.last_name}</td>
//                 <td className="px-6 py-3">{user.email}</td>
//                 <td className="px-6 py-3">{user.confirmed_packages}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/admin/manage-users",
          { withCredentials: true }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-600">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto shadow-lg border-collapse border rounded-lg">
          <thead
            className="text-white"
            style={{
              background: "linear-gradient(to right, #8360c3, #2ebf91)",
            }}
          >
            <tr>
              <th className="px-6 py-2 text-left">User ID (CID)</th>
              <th className="px-6 py-2 text-left">First Name</th>
              <th className="px-6 py-2 text-left">Last Name</th>
              <th className="px-6 py-2 text-left">Email</th>
              <th className="px-6 py-2 text-left">Confirmed Packages</th>
              <th className="px-6 py-2 text-left">Pending Packages</th>
              <th className="px-6 py-2 text-left">Completed Packages</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-100">
                <td className="px-6 py-3">{user.user_id}</td>
                <td className="px-6 py-3">{user.first_name}</td>
                <td className="px-6 py-3">{user.last_name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.confirmed_packages}</td>
                <td className="px-6 py-3">{user.pending_packages}</td>
                <td className="px-6 py-3">{user.completed_packages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
