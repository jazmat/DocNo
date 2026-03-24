import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Profile() {

  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  /* LOAD PROFILE FROM API */

  useEffect(() => {

    const loadProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setProfile(res.data);

        if (res.data?.full_name) {
          setFullName(res.data.full_name);
        }

      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();

  }, []);

  /* SAVE PROFILE */

  const saveProfile = async () => {

    try {

      await api.put("/users/profile", {
        full_name: fullName
      });

      setProfile({
        ...profile,
        full_name: fullName
      });

      alert("Profile updated successfully");
      setEditing(false);

    } catch (err) {

      console.error("Profile update failed", err);
      alert("Failed to update profile");

    }

  };

  /* PASSWORD HANDLING */

  const handleChange = (e) => {

    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });

  };

  const changePassword = async () => {

    if (passwords.new_password !== passwords.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post("/auth/change-password", {
        currentPassword: passwords.current_password,
        newPassword: passwords.new_password
      });

      alert("Password updated successfully");

      setPasswords({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (err) {

      alert(err.response?.data?.error || "Failed to change password");

    }

  };

  /* VALUES */

  const displayName = profile?.full_name || user?.full_name || "";
  const displayEmail = profile?.email || user?.email || "";
  const displayDepartment = profile?.name || "N/A";

  return (

    <div className="space-y-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            My Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PROFILE INFO */}

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold mb-4">
              Profile Information
            </h2>

            <div className="space-y-3">

              {editing ? (

                <div>
                  <label className="text-sm text-gray-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

              ) : (

                <>
                  <Info label="Full Name" value={displayName} />
                  <Info label="Email" value={displayEmail} />
                  <Info label="Department" value={displayDepartment} />
                </>

              )}

            </div>

            <div className="mt-4 flex gap-2">

              {!editing && (

                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

              )}

              {editing && (

                <>
                  <button
                    onClick={saveProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditing(false);
                      setFullName(displayName);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>

              )}

            </div>

          </div>

          {/* ACCOUNT STATUS */}

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold mb-4">
              Account Status
            </h2>

            <div className="space-y-3">

              <Info
                label="Role"
                value={
                  user?.is_super_admin
                    ? "Super Admin"
                    : user?.is_admin
                      ? "Administrator"
                      : "User"
                }              />

              <Info
                label="Super Admin"
                value={user?.is_super_admin ? "Yes" : "No"}
              />

              <Info label="Status" value="Active" />

            </div>

          </div>

          {/* CHANGE PASSWORD */}

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold mb-4">
              Change Password
            </h2>

            <div className="space-y-3">

              <input
                type="password"
                name="current_password"
                placeholder="Current Password"
                value={passwords.current_password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={passwords.new_password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={passwords.confirm_password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <button
                onClick={changePassword}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/* SMALL REUSABLE COMPONENT */

const Info = ({ label, value }) => (

  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>

);

export default Profile;