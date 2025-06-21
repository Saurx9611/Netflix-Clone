"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

export default function LoginPage() {
  const { login, googleLogin, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
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
    try {
      await login(form);
      router.replace("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setError("");
      await googleLogin(credentialResponse.credential);
      router.replace("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8 backdrop-blur">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            autoFocus
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
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="my-4 flex items-center justify-center">
          <span className="text-gray-400 text-xs">or</span>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="rectangular"
          />
        </div>
        <div className="mt-6 text-center text-sm text-gray-300">
          New to Netflix?{" "}
          <Link href="/register" className="text-red-500 hover:underline">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
