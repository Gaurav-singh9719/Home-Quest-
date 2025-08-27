import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./TenantDashboard.css";

const TenantDashboard = () => {
  const { user, logout } = useAuth();

  // Dummy properties
  const properties = [
    { id: 1, title: "Luxury Apartment", location: "Mumbai", rent: "₹25,000" },
    { id: 2, title: "Cozy 2BHK Flat", location: "Delhi", rent: "₹18,000" },
    { id: 3, title: "Villa with Garden", location: "Bangalore", rent: "₹45,000" },
  ];

  const [applications, setApplications] = useState([]);

  const applyForProperty = (property) => {
    if (applications.find((a) => a.id === property.id)) {
      alert("⚠️ Already applied for this property!");
    } else {
      setApplications([...applications, property]);
      alert(`✅ Successfully applied for ${property.title}`);
    }
  };

  return (
    <div className="tenant-dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user?.email} 👋</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <section className="properties-section">
        <h3>Available Properties</h3>
        <div className="property-list">
          {properties.map((p) => (
            <div className="property-card" key={p.id}>
              <h4>{p.title}</h4>
              <p>{p.location}</p>
              <p><strong>{p.rent}</strong></p>
              <button onClick={() => applyForProperty(p)}>Apply</button>
            </div>
          ))}
        </div>
      </section>

      <section className="applications-section">
        <h3>My Applications</h3>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <ul>
            {applications.map((a) => (
              <li key={a.id}>{a.title} - {a.location} - {a.rent}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TenantDashboard;
