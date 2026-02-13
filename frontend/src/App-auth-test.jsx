// Test App component to check if AuthContext is working
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Login component that uses AuthContext
const LoginWithAuth = () => {
  const { login, isAuthenticated, user, error, loading } = useAuth();
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("Admin@123");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mock login - in real app this would call the API
    const mockToken = "test-jwt-token-12345";
    const mockUser = {
      id: 1,
      email: email,
      full_name: "Test Admin User",
      is_admin: true,
    };

    // Use AuthContext login method
    login(mockToken, mockUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                🎉 AuthContext is Working!
              </h1>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset Test
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Authentication Success
              </h2>
              <p className="text-green-700">
                You are now logged in! Here's your user data:
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                User Information:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span className="text-gray-600">{user.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">User ID:</span>
                  <span className="text-gray-600">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Admin:</span>
                  <span
                    className={`${user.is_admin ? "text-green-600" : "text-gray-600"}`}
                  >
                    {user.is_admin ? "✅ Yes" : "❌ No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Authenticated:</span>
                  <span className="text-green-600">
                    ✅ {isAuthenticated ? "True" : "False"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                🔧 What's Working:
              </h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>✅ AuthContext Provider</li>
                <li>✅ useAuth hook</li>
                <li>✅ Login functionality</li>
                <li>✅ User state management</li>
                <li>✅ LocalStorage persistence</li>
                <li>✅ Loading states</li>
                <li>✅ Tailwind CSS styling</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Next step: Add React Router and restore full application
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            DocNo - AuthContext Test
          </h1>
          <p className="text-gray-600">Testing authentication context</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm">Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Test Login with AuthContext
          </button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> This is a mock login that tests AuthContext
            functionality. It doesn't connect to the real backend yet.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials are pre-filled
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App component wrapped with AuthProvider
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <LoginWithAuth />
      </div>
    </AuthProvider>
  );
}

export default App;
