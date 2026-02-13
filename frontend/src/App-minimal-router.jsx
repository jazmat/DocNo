// Minimal React Router test to isolate the issue
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Simple test components
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 React Router is Working!
        </h1>
        <p className="text-gray-600 mb-6">
          This confirms that React Router is functioning correctly.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/test')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-4"
          >
            Go to Test Page
          </button>
          <button
            onClick={() => navigate('/about')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Go to About Page
          </button>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">✅ What's Working:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>✅ React is rendering</li>
            <li>✅ BrowserRouter is working</li>
            <li>✅ useNavigate hook is working</li>
            <li>✅ Tailwind CSS is working</li>
            <li>✅ Routes and navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const TestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-900 mb-4">
          🧪 Test Page
        </h1>
        <p className="text-gray-600 mb-6">
          Great! You successfully navigated to the test page.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          ℹ️ About Page
        </h1>
        <p className="text-gray-600 mb-6">
          This is the about page. React Router navigation is working perfectly!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-red-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// Main App with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
