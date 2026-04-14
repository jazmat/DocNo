import React from "react";
import { Routes, Route } from "react-router-dom";

import DocumentStats from "../components/DocumentStats";
import DocumentForm from "../components/DocumentForm";
import RecentDocuments from "../components/RecentDocuments";

// EXISTING PAGES
import Profile from "./Profile";
import History from "./History";

// ADMIN PAGES
import AdminDashboard from "./admin/AdminDashboard";
import UserApprovals from "./admin/UserApprovals";
import Departments from "./admin/Departments";
import Categories from "./admin/Categories";
import EmailDomains from "./admin/EmailDomains";
// ✅ ADD THIS
import AuditLogs from "./admin/AuditLogs";
function Dashboard() {
    return (
        <div className="p-6 space-y-6">

            <Routes>

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <DocumentStats />
                            <DocumentForm />
                            <RecentDocuments />
                        </>
                    }
                />

                {/* ALSO HANDLE ROOT */}
                <Route
                    path="/"
                    element={
                        <>
                            <DocumentStats />
                            <DocumentForm />
                            <RecentDocuments />
                        </>
                    }
                />

                {/* USER */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<History />} />

                {/* ADMIN */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserApprovals />} />
                <Route path="/admin/departments" element={<Departments />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/email-domains" element={<EmailDomains />} />

                {/* ✅ NEW */}
                <Route path="/admin/audit" element={<AuditLogs />} />
            </Routes>

        </div>
    );
}

export default Dashboard;