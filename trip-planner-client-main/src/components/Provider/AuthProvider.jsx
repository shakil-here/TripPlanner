import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  // updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase_init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error; // Rethrow error to be handled in Register component
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Send a request to the server to clear the JWT cookie
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      // Sign out from Firebase
      await signOut(auth);

      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // const updateUserProfile = (updatedData) => {
  //   return updateProfile(auth.currentUser, updatedData);
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          // Add a short delay to ensure session is set up
          await new Promise((resolve) => setTimeout(resolve, 500)); // 500 ms delay
          const response = await axios.get("http://localhost:5000/api/user", {
            withCredentials: true,
          });
          const backendUser = response.data;
          setUser({
            ...currentUser,
            role: backendUser.role,
            photoURL: backendUser.photoURL,
          });
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    logout,
    // updateUserProfile,
    setError,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700 mt-4">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
