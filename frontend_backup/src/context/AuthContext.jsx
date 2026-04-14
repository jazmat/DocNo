import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

// Decode JWT (safe fallback only, NOT source of truth)
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return {
        token,
        id: payload.id,
        email: payload.email,
        full_name: payload.full_name,
        is_admin: payload.is_admin === 1 || payload.is_admin === true,
        is_super_admin: payload.is_super_admin === 1 || payload.is_super_admin === true,
      };
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // 🔥 INITIAL AUTH CHECK
  useEffect(() => {
    //console.log("🔥 AUTH INIT TRIGGERED");
    const initAuth = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        // ✅ THIS IS THE MISSING CALL
        // ✅ CORRECT
        const res = await API.get("/users/me");
        setUser({
          token,
          ...res.data
        });

      } catch (err) {

        console.error("Auth restore failed:", err);

        localStorage.removeItem("token");
        setUser(null);

      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);
  const login = async (email, password) => {
    try {
      //console.log("AUTH LOGIN CALLED");
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (!data.token) {
        throw new Error("No token received");
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Decode token (optional but useful)
      const payload = decodeToken(data.token);

      const userObj = {
        token: data.token,
        id: payload?.id,
        email: payload?.email,
        full_name: payload?.full_name,
        is_admin: payload?.is_admin==1,
        is_super_admin: payload?.is_super_admin==1,
      };

      setUser(userObj);

      return userObj;

    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);

      throw new Error(
        err?.response?.data?.message || "Invalid credentials"
      );
    }
  };

  // ✅ LOGOUT
  import api from "../services/api";

  const logout = async () => {
    try {
      await api.post("/admin/audit/logout");
    } catch (err) {
      console.warn("Logout log failed:", err.message);
    }

    localStorage.removeItem("token");
    window.location.href = "/login"; // ensure redirect
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}