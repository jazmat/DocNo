// Complete DocNo Application
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-700 mb-6">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.href = "/dashboard";
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Reload Page
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                If this problem persists, please check the console for more
                details.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p className="text-gray-600 text-lg">{message}</p>
    <div className="mt-2 text-sm text-gray-500">
      DocNo - Document Number Generator
    </div>
  </div>
);

// App Routes Component
function AppRoutes() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing application..." />;
  }

  return (
    <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Root redirect */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
                <div className="text-blue-500 text-6xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                  The page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() =>
                    (window.location.href = isAuthenticated
                      ? "/dashboard"
                      : "/login")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
