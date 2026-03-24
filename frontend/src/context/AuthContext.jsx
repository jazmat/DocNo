import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(() => {

    if (!token) return null;

    const payload = decodeToken(token);

    if (!payload) return null;

    return {
      token,
      id: payload.id,
      email: payload.email,
      full_name: payload.full_name,
      is_admin: payload.is_admin,
      is_super_admin: payload.is_super_admin
    };

  });

  const login = async (email, password) => {

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!data.token) {
      throw new Error("Login failed");
    }

    localStorage.setItem("token", data.token);

    const payload = decodeToken(data.token);

    setUser({
      token: data.token,
      id: payload.id,
      email: payload.email,
      full_name: payload.full_name,
      is_admin: payload.is_admin,
      is_super_admin: payload.is_super_admin
    });

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {

  return useContext(AuthContext);

}