import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SetPassword from "./pages/SetPassword";

function App() {
    //console.log("APP RENDERING");

    return (
        <Router>
            <Routes>

                {/* PUBLIC */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/set-password" element={<SetPassword />} />

                {/* PROTECTED */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </Router>
    );
}

export default App;