import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { ROUTES } from "./constants/routes";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DocumentGenerator from "./pages/DocumentGenerator";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SetPassword from "./pages/SetPassword";
import RegistReqSubmitted from "./pages/RegistReqSubmitted";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditLogs from "./pages/admin/AuditLogs";
import Categories from "./pages/admin/Categories";
import Departments from "./pages/admin/Departments";
import RejectUser from "./pages/admin/RejectUser";
import SequenceMonitor from "./pages/admin/SequenceMonitor";
import UserApprovals from "./pages/admin/UserApprovals";

import ProtectedRoute from "./components/ProtectedRoute";
import EmailDomains from "./pages/admin/EmailDomains";

function App() {

    return (

        <Router>

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route path={ROUTES.LOGIN} element={<Login />} />

                <Route path={ROUTES.REGISTER} element={<Register />} />

                <Route
                    path={ROUTES.REGISTER_SUBMITTED}
                    element={<RegistReqSubmitted />}
                />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/set-password" element={<SetPassword />} />


                {/* USER ROUTES */}


                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.GENERATE}
                    element={
                        <ProtectedRoute>
                            <DocumentGenerator />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.HISTORY}
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* ADMIN ROUTES */}

                <Route
                    path={ROUTES.ADMIN_DASHBOARD}
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.ADMIN_DEPARTMENTS}
                    element={
                        <ProtectedRoute adminOnly>
                            <Departments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.ADMIN_CATEGORIES}
                    element={
                        <ProtectedRoute adminOnly>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.ADMIN_USERS}
                    element={
                        <ProtectedRoute adminOnly>
                            <UserApprovals />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.ADMIN_AUDIT}
                    element={
                        <ProtectedRoute adminOnly>
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/sequences"
                    element={
                        <ProtectedRoute adminOnly>
                            <SequenceMonitor />
                        </ProtectedRoute>
                    }
                />


                {/* DEFAULT ROUTES */}

                <Route
                    path="/"
                    element={<Navigate to={ROUTES.DASHBOARD} />}
                />

                <Route
                    path="*"
                    element={<Navigate to={ROUTES.DASHBOARD} />}
                />
                <Route
                    path={ROUTES.ADMIN_EMAIL_DOMAINS}
                    element={
                        <ProtectedRoute adminOnly>
                            <EmailDomains />
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </Router>

    );

}

export default App;