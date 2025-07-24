import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("amancom_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("amancom_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("amancom_token")));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem("amancom_user", JSON.stringify(data.user));
      localStorage.setItem("amancom_token", data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem("amancom_user");
      localStorage.removeItem("amancom_token");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("amancom_user");
    localStorage.removeItem("amancom_token");
  };

  // Optionally, add effect to auto-logout on token expiry in the future

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 