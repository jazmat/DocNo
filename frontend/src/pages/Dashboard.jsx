import React from "react";

import DocumentStats from "../components/DocumentStats";
import DocumentForm from "../components/DocumentForm";
import RecentDocuments from "../components/RecentDocuments";

function Dashboard() {

    return (

        <div className="p-6 space-y-6">

            <DocumentStats />

            <DocumentForm />

            <RecentDocuments />

        </div>

    );

}

export default Dashboard;