import React from "react";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;