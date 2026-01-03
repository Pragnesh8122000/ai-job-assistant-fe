import React, { createContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages authentication state and provides auth methods to the app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize auth state on mount
   * Check if user has valid token and fetch user data
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch current user with existing token
        const response = await authApi.getCurrentUser();
        // Backend returns flat user object for /me
        setUser(response);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Token is invalid, clear it
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login function
   * @param {Object} credentials - { email, password }
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      // Login returns { ...user, token }
      const { token, ...userData } = response;

      // Store access token in memory (localStorage)
      localStorage.setItem("accessToken", token);

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  }, []);

  /**
   * Logout function
   * Clears tokens and user data
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  const hasRole = useCallback(
    (role) => {
      if (!user || !user.role) return false;
      return user.role.toLowerCase() === role.toLowerCase();
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   * @param {Array<string>} roles - Roles to check
   * @returns {boolean}
   */
  const hasAnyRole = useCallback(
    (roles) => {
      if (!user || !user.role) return false;
      return roles.some(
        (role) => role.toLowerCase() === user.role.toLowerCase()
      );
    },
    [user]
  );

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
