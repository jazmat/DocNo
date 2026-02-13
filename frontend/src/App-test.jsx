// Simple test App component to diagnose blank page issue
import React from "react";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>
        DocNo Test - React is Working! 🎉
      </h1>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#666", marginBottom: "10px" }}>
          Debug Information:
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "5px" }}>✅ React is rendering</li>
          <li style={{ marginBottom: "5px" }}>✅ JavaScript is working</li>
          <li style={{ marginBottom: "5px" }}>✅ Vite dev server is running</li>
          <li style={{ marginBottom: "5px" }}>✅ CSS styles are applying</li>
        </ul>
        <p style={{ marginTop: "15px", color: "#888" }}>
          If you can see this message, your basic React setup is working
          correctly.
        </p>
        <button
          onClick={() => alert("Button click works!")}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Test Button Click
        </button>
      </div>
    </div>
  );
}

export default App;
