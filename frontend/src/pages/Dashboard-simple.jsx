// Simple Dashboard component without API calls - for testing
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [generatedNumber, setGeneratedNumber] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    document_title: "",
    document_category: "Report",
    department: "Information Technology",
    notes: "",
  });

  const handleGenerateNumber = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock document number generation
      const now = new Date();
      const dateString = now.toISOString().slice(0, 10).replace(/-/g, "");
      const deptCode =
        formData.department === "Information Technology" ? "IT" : "HR";
      const catCode = formData.document_category.substring(0, 3).toUpperCase();
      const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(
        3,
        "0",
      );
      const initials = user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      const mockDocNumber = `${deptCode}-${catCode}-${dateString}-${sequence}-${initials}`;
      setGeneratedNumber(mockDocNumber);

      // Reset form
      setFormData({
        document_title: "",
        document_category: "Report",
        department: "Information Technology",
        notes: "",
      });
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                DocNo Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Document Number Generator
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="text-gray-700">
                  Welcome,{" "}
                  <span className="font-semibold">{user.full_name}</span>
                </p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Generation Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Generate Document Number
            </h2>

            <form onSubmit={handleGenerateNumber} className="space-y-6">
              <div>
                <label
                  htmlFor="document_title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Document Title *
                </label>
                <input
                  type="text"
                  id="document_title"
                  name="document_title"
                  required
                  value={formData.document_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label
                  htmlFor="document_category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Document Category *
                </label>
                <select
                  id="document_category"
                  name="document_category"
                  required
                  value={formData.document_category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Report">Report</option>
                  <option value="Template">Template</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Invoice">Invoice</option>
                  <option value="Contract">Contract</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Memo">Memo</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any additional notes..."
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Document Number"
                )}
              </button>
            </form>
          </div>

          {/* Generated Number Display */}
          <div className="space-y-6">
            {generatedNumber && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-green-800">
                    Document Number Generated!
                  </h3>
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Your Document Number:
                  </p>
                  <div className="bg-gray-50 rounded p-3 font-mono text-lg font-bold text-center border-2 border-dashed border-gray-300">
                    {generatedNumber}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(generatedNumber)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={() => setGeneratedNumber(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Documents Today</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">128</div>
                  <div className="text-sm text-gray-600">Total Generated</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => alert("History feature coming soon!")}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    View Document History
                  </div>
                </button>
                <button
                  onClick={() => alert("Profile feature coming soon!")}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Update Profile
                  </div>
                </button>
                <button
                  onClick={() => alert("Settings feature coming soon!")}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Demo Mode:</strong> This is a simplified version of the
            dashboard with mock data. Document numbers are generated locally
            without backend connection.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
