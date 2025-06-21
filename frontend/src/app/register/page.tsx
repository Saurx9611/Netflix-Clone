"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace("/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (form.password !== form.password_confirm) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      await register(form);
      router.replace("/profile"); // Or router.replace('/login') to have them log in after registering
    } catch (err: any) {
      const serverErrors = err?.response?.data;
      if (serverErrors) {
        // Concatenate all error messages from the backend
        const messages = Object.values(serverErrors).flat().join(" ");
        setError(messages || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8 backdrop-blur">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password_confirm"
            placeholder="Confirm Password"
            value={form.password_confirm}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
            disabled={submitting}
          >
            {submitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
