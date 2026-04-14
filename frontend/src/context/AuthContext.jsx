import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Restore user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Auth restore failed");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:7050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // ❗ CRITICAL FIX
      if (!data.token) {
        throw new Error("No token received");
      }
      localStorage.removeItem("token")
      // ✅ store correct token
      localStorage.setItem("token", data.token);

      // ✅ store user if needed
      setUser(data.user);

      return data;

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      throw err;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);