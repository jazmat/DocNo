// Simplified App.jsx for testing components individually
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Simple Login Component for testing
const SimpleLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login attempt: ${email}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#1f2937",
          }}
        >
          DocNo - Document Generator
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="admin@company.com"
              required
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="Admin@123"
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
          >
            Sign In
          </button>
        </form>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f9fafb",
            borderRadius: "4px",
            fontSize: "0.875rem",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280" }}>Demo Credentials:</p>
          <p style={{ margin: "0.25rem 0 0 0", color: "#374151" }}>
            <strong>Email:</strong> admin@company.com
            <br />
            <strong>Password:</strong> Admin@123
          </p>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#6b7280",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <span style={{ color: "#3b82f6", cursor: "pointer" }}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

// Simple Dashboard Component for testing
const SimpleDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#1f2937",
          }}
        >
          Dashboard
        </h1>
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
            Welcome to DocNo! Generate document numbers easily.
          </p>
          <button
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() =>
              alert("Generate Document Number feature coming soon!")
            }
          >
            Generate Document Number
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component with simple routing
function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("login");
  };

  // Simple conditional rendering instead of React Router for now
  if (currentPage === "login" && !isAuthenticated) {
    return (
      <div>
        <SimpleLogin />
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleLogin}
        >
          Quick Login (Test)
        </div>
      </div>
    );
  }

  if (currentPage === "dashboard" && isAuthenticated) {
    return (
      <div>
        <SimpleDashboard />
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "#ef4444",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#1f2937", marginBottom: "1rem" }}>DocNo</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Document Number Generator
        </p>
        <button
          onClick={() => setCurrentPage("login")}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default App;
