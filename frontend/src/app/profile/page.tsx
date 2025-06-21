"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [loggingOut, setLoggingOut] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");
    try {
      await logout();
      router.replace("/login");
    } catch (err: any) {
      setError("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8 backdrop-blur flex flex-col items-center">
        <img
          src={
            user.profile_picture_url ||
            `https://ui-avatars.com/api/?name=${user.full_name}`
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-red-600 shadow mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-white mb-1">{user.full_name}</h2>
        <p className="text-gray-300 mb-2">{user.email}</p>
        <div className="flex flex-col gap-1 text-gray-400 text-sm w-full">
          <div>
            <span className="font-semibold text-white">Username:</span>{" "}
            {user.username}
          </div>
          <div>
            <span className="font-semibold text-white">Plan:</span>{" "}
            {user.subscription_plan}
          </div>
          <div>
            <span className="font-semibold text-white">Active:</span>{" "}
            {user.is_active_subscription ? "Yes" : "No"}
          </div>
        </div>
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
