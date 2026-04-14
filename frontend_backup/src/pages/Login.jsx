import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Login() {
  //console.log("LOGIN COMPONENT RENDERED");

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("SUBMIT CLICKED");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >
        <header className="flex items-center gap-4 mb-4">
          <img src={logo} alt="Logo" style={{ width: "60px" }} />
          <h1 className="text-lg font-semibold">
            Doc No Generator System
          </h1>
        </header>

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
        <a
          href="/forgot-password"
          className="text-blue-600"
        >
          Forgot password?
        </a>

        <p className="text-sm mt-4 text-center">
          Don't have an account?
          <a href="/register" className="text-blue-600 ml-1">
            Register
          </a>
        </p>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}