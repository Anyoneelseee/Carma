import React from "react";
import "@/styles/Dashboard.css";

const ProfessorDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Placeholder */}
      <div className="sidebar">Sidebar Placeholder</div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar Placeholder */}
        <div className="top-bar">
          <h1 className="title">Carma - Professor</h1>
        </div>

        <div className="dashboard-content">
          <h2>Welcome, Professor</h2>
          <p>Manage classes, assign coding activities, and track student progress.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
