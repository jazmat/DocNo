import React from "react";

import Sidebar from "../Sidebar";
import TopNavbar from "../TopNavbar";

function MainLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <TopNavbar />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>

  );

}

export default MainLayout;