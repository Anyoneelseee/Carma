import React from "react";
import "@/styles/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Placeholder */}
      <div className="sidebar">Sidebar Placeholder</div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar Placeholder */}
        <div className="top-bar">
          <h1 className="title">Carma</h1>
        </div>

        <div className="dashboard-content">
          <h2>Welcome to Dashboard</h2>
          <p>Your coding activities will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
