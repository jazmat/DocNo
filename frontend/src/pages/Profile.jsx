import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    department: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  /* =============================
     LOAD PROFILE
  ============================= */
  useEffect(() => {
    const loadProfile = async () => {
      const res = await api.get("/users/profile");
      setUser(res.data.user);
      setForm({
        full_name: res.data.user.full_name || "",
        department: res.data.user.department || "",
      });
    };

    loadProfile();
  }, []);

  /* =============================
     PROFILE UPDATE
  ============================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await api.put("/users/profile", form);
    alert("Profile updated successfully");
  };

  /* =============================
     PASSWORD CHANGE
  ============================= */
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.put("/users/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      alert("Password changed successfully");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      alert(err.response?.data?.error || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* ACCOUNT INFO */}
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h2 className="font-semibold mb-3">Account Information</h2>

          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <p>
            <strong>Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${user.status === "Active"
                ? "bg-green-600"
                : "bg-red-600"
              }`}>
              {user.status}
            </span>
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* EDIT PROFILE */}
        <h2 className="font-semibold mb-3">Edit Profile</h2>

        <label className="block mb-2">Full Name</label>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2">Department</label>
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-2 mb-6 rounded"
        />

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-8"
        >
          Save Changes
        </button>

        {/* PASSWORD CHANGE */}
        <div className="border-t pt-6">
          <h2 className="font-semibold mb-4">Change Password</h2>

          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <label className="block mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <label className="block mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            onClick={changePassword}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

      </div>
    </div>
  );
};

export default Profile;