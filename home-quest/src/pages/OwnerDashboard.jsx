import React, { useState } from "react";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([
    { id: 1, title: "Studio Apartment", location: "Pune", price: 12000, applications: 0 },
  ]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
  });

  const [requests, setRequests] = useState([
    { id: 1, tenant: "Rahul Sharma", property: "Studio Apartment", status: "Pending" },
    { id: 2, tenant: "Priya Patel", property: "Studio Apartment", status: "Pending" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) return;
    setProperties([
      ...properties,
      { id: Date.now(), ...newProperty, applications: 0 },
    ]);
    setNewProperty({ title: "", location: "", price: "" });
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const handleRequest = (id, action) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  return (
    <div className="owner-dashboard">
      <h2>Welcome, owner@example.com 🏡</h2>

      {/* Add Property Form */}
      <div className="add-property-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProperty.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newProperty.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Rent"
          value={newProperty.price}
          onChange={handleChange}
        />
        <button onClick={addProperty}>Add Property</button>
      </div>

      {/* My Properties */}
      <div className="my-properties">
        <h3>My Properties</h3>
        {properties.length > 0 ? (
          properties.map((p) => (
            <div key={p.id} className="property-card">
              <h4>{p.title}</h4>
              <p>{p.location}</p>
              <p>₹{p.price.toLocaleString()}</p>
              <p>Applications: {p.applications}</p>
              <button
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 1rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
                onClick={() => deleteProperty(p.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No properties yet.</p>
        )}
      </div>

      {/* Tenant Requests */}
      <div className="tenant-requests">
        <h3>Tenant Requests</h3>
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <p><strong>{req.tenant}</strong> applied for <em>{req.property}</em></p>
              <p>Status: <span>{req.status}</span></p>
              {req.status === "Pending" && (
                <div className="request-actions">
                  <button
                    style={{
                      background: "#2ecc71",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                    onClick={() => handleRequest(req.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    style={{
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRequest(req.id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tenant requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
