// Test App component to check if Tailwind CSS is working
import React, { useState } from "react";

function App() {
  const [showTailwindTest, setShowTailwindTest] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            DocNo - Tailwind CSS Test
          </h1>
          <p className="text-gray-600 mb-4">
            This page tests if Tailwind CSS classes are working properly.
          </p>

          <button
            onClick={() => setShowTailwindTest(!showTailwindTest)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {showTailwindTest ? "Hide" : "Show"} Tailwind Test
          </button>
        </div>

        {/* Tailwind CSS Test Section */}
        {showTailwindTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Colors Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Colors
              </h2>
              <div className="space-y-2">
                <div className="w-full h-4 bg-red-500 rounded"></div>
                <div className="w-full h-4 bg-green-500 rounded"></div>
                <div className="w-full h-4 bg-blue-500 rounded"></div>
                <div className="w-full h-4 bg-yellow-500 rounded"></div>
                <div className="w-full h-4 bg-purple-500 rounded"></div>
              </div>
            </div>

            {/* Typography Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Typography
              </h2>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Extra Small Text</p>
                <p className="text-sm text-gray-600">Small Text</p>
                <p className="text-base text-gray-700">Base Text</p>
                <p className="text-lg text-gray-800">Large Text</p>
                <p className="text-xl font-bold text-gray-900">
                  Extra Large Bold
                </p>
              </div>
            </div>

            {/* Layout Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Layout
              </h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex-1 bg-blue-100 p-2 rounded text-center text-sm">
                  Flex 1
                </div>
                <div className="flex-1 bg-green-100 p-2 rounded text-center text-sm">
                  Flex 2
                </div>
                <div className="w-full bg-purple-100 p-2 rounded text-center text-sm mt-2">
                  Full Width
                </div>
              </div>
            </div>

            {/* Buttons Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Buttons
              </h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                  Primary Button
                </button>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors">
                  Secondary Button
                </button>
                <button className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded transition-colors">
                  Outline Button
                </button>
              </div>
            </div>

            {/* Forms Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Forms
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Text Input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            {/* Responsive Test */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Responsive
              </h2>
              <div className="text-sm space-y-1">
                <div className="block sm:hidden bg-red-100 p-2 rounded">
                  Mobile Only
                </div>
                <div className="hidden sm:block md:hidden bg-yellow-100 p-2 rounded">
                  Tablet Only
                </div>
                <div className="hidden md:block bg-green-100 p-2 rounded">
                  Desktop Only
                </div>
                <div className="bg-blue-100 p-2 rounded">Always Visible</div>
              </div>
            </div>
          </div>
        )}

        {/* Status Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Status Check
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">React is working ✅</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Vite dev server is running ✅
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full ${showTailwindTest ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-gray-700">
                  Tailwind CSS is{" "}
                  {showTailwindTest ? "working ✅" : "being tested 🧪"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Next Steps:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Test Tailwind classes</li>
                <li>• Add AuthContext back</li>
                <li>• Restore React Router</li>
                <li>• Test full application</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>How to test:</strong> If you can see colorful boxes,
              styled buttons, and proper spacing above, then Tailwind CSS is
              working correctly! If everything looks plain (no colors, basic
              fonts), then we need to fix the Tailwind configuration.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                alert("This would restore the original DocNo app!")
              }
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Restore Full App
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Refresh Page
            </button>
            <button
              onClick={() =>
                console.log("Tailwind test results:", {
                  working: showTailwindTest,
                })
              }
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Log Test Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
