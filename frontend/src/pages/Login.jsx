import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    try {

      await login(email, password);

      navigate("/dashboard");

    } catch (err) {

      setError("Invalid credentials");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow w-96">
        <header className="flex items-center gap-4 mb-4">

          <img src={logo} alt="Company Logo" style={{ width: "60px" }} />

          <h1 className="text-lg font-semibold">
            Doc No Generator System
          </h1>

        </header>
        <hr className="my-4" />
        {error && <p className="text-red-500">{error}</p>}

        <input
          required
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        <div className="flex justify-between text-sm mt-3">

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
        </div>
      </form>

    </div>

  );

}

export default Login;