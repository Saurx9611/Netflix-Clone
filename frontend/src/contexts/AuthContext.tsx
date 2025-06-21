"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI, authUtils } from "@/lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture_url: string;
  subscription_plan: string;
  is_active_subscription: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
  }) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authUtils.isAuthenticated()) {
          const userData = await authAPI.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        authUtils.clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await authAPI.login(credentials);
      authUtils.setTokens(response.tokens);
      authUtils.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
  }) => {
    try {
      const response = await authAPI.register(userData);
      authUtils.setTokens(response.tokens);
      authUtils.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const googleLogin = async (credential: string) => {
    try {
      const response = await authAPI.googleOAuth(credential);
      authUtils.setTokens(response.tokens);
      authUtils.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      authUtils.clearAuth();
      setUser(null);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const updatedUser = await authAPI.updateProfile(profileData);
      authUtils.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    googleLogin,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
