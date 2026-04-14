import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department_id: "",
    requested_role: "user",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {

    try {

      const res = await api.get("/admin/departments");

      //console.log("Departments API response:", res.data);

      setDepartments(res.data);

    } catch (err) {

      console.error("Departments load error:", err);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register-request", form);

      alert("Registration request submitted. Await admin approval.");

      navigate("/register-submitted");

    } catch (err) {

      alert(err.response?.data?.error || "Registration failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Request Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* Department Dropdown */}

          <select
            className="w-full border p-2 rounded"
            value={form.department_id}
            onChange={(e) =>
              setForm({ ...form, department_id: e.target.value })
            }
            required
          >

            <option value="">Select Department</option>

            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}

          </select>

          {/* Role Request */}

          <select
            className="w-full border p-2 rounded"
            value={form.requested_role}
            onChange={(e) =>
              setForm({ ...form, requested_role: e.target.value })
            }
          >

            <option value="user">User</option>
            <option value="admin">Admin</option>

          </select>

          <div className="flex gap-3">

            <button
              type="submit"
              className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Submit Request
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

          </div>
        </form>

      </div>

    </div>

  );

};

export default Register;