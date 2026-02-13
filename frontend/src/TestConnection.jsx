// Test component to check frontend-backend connection
import React, { useState } from 'react';

const TestConnection = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (test, status, message) => {
    setTestResults(prev => [...prev, { test, status, message }]);
  };

  const runTests = async () => {
    setTestResults([]);
    setIsLoading(true);

    // Test 1: Backend Health Check
    try {
      const response = await fetch('http://localhost:3000/health');
      if (response.ok) {
        const data = await response.json();
        addResult('Health Check', 'success', `Backend is running: ${JSON.stringify(data)}`);
      } else {
        addResult('Health Check', 'error', `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      addResult('Health Check', 'error', `Connection failed: ${error.message}`);
    }

    // Test 2: CORS Check
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'wrongpassword'
        })
      });

      if (response.status === 401) {
        addResult('CORS Check', 'success', 'CORS is working (got expected 401 error)');
      } else {
        const data = await response.text();
        addResult('CORS Check', 'warning', `Unexpected response: ${data}`);
      }
    } catch (error) {
      if (error.message.includes('CORS')) {
        addResult('CORS Check', 'error', `CORS Error: ${error.message}`);
      } else {
        addResult('CORS Check', 'error', `Network Error: ${error.message}`);
      }
    }

    // Test 3: Registration Endpoint
    const testUser = {
      username: 'testuser' + Date.now(),
      email: `test${Date.now()}@test.com`,
      password: 'Test123!',
      full_name: 'Test User',
      department: 'Information Technology'
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUser)
      });

      const data = await response.text();

      if (response.ok) {
        addResult('Registration', 'success', 'Registration endpoint is working');
      } else {
        addResult('Registration', 'error', `Registration failed: ${data}`);
      }
    } catch (error) {
      addResult('Registration', 'error', `Registration error: ${error.message}`);
    }

    setIsLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔧 Frontend-Backend Connection Test
          </h1>

          <div className="mb-6">
            <button
              onClick={runTests}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Running Tests...' : 'Run Connection Tests'}
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span>Testing connections...</span>
            </div>
          )}

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start">
                  <span className="text-xl mr-3">{getStatusIcon(result.status)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{result.test}</h3>
                    <p className="mt-1">{result.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {testResults.length > 0 && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• If Health Check fails: Make sure backend is running with `cd backend && npm run dev`</li>
                <li>• If CORS errors: Check backend CORS configuration in app.js</li>
                <li>• If Registration fails: Check database connection and backend logs</li>
                <li>• Backend should run on: http://localhost:3000</li>
                <li>• Frontend should run on: http://localhost:3001</li>
              </ul>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;
