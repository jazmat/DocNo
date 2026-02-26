import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DocumentForm from '../components/DocumentForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [successMessage, setSuccessMessage] = useState(null);

  /* =============================
     LOGOUT
  ============================= */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /* =============================
     DOCUMENT SUCCESS CALLBACK
  ============================= */
  const handleDocumentSuccess = (data) => {
    setSuccessMessage(
      `Document ${data.documentNumber} created successfully!`
    );

    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">DocNo</h1>
            <p className="text-gray-600">
              Welcome, {user?.full_name}
            </p>
          </div>

          <div className="flex gap-4">
            {user?.is_super_admin && (
              <button
                onClick={() => navigate("/admin/departments")}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Departments
              </button>
            )}
            {user?.is_super_admin && (
              <button
                onClick={() => navigate("/admin/categories")}
                className="px-4 py-2 bg-purple-700 text-white rounded"
              >
                Categories
              </button>
            )}
            <button
              onClick={() => navigate('/history')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              History
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Profile
            </button>

            {/* ADMIN ONLY BUTTON */}
            {user?.role === "admin" && (
              <button
                onClick={() => navigate('/admin/users')}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Users
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* DOCUMENT FORM */}
          <div className="lg:col-span-2">
            <DocumentForm onSuccess={handleDocumentSuccess} />
          </div>

          {/* QUICK INFO PANEL */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Info</h2>

            <div className="space-y-4">

              <div className="border-b pb-3">
                <p className="text-gray-600 text-sm">Department</p>
                <p className="font-semibold">
                  {user?.department || 'N/A'}
                </p>
              </div>
              <div className="border-b pb-3">
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold text-sm break-all">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Account Type</p>
                <p className="font-semibold">
                  {user?.role === "admin"
                    ? "Administrator"
                    : "User"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;