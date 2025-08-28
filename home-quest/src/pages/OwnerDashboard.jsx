import React, { useState } from "react";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Studio Apartment",
      location: "Pune",
      price: 12000,
      applications: 0,
      image: "",
    },
  ]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  const [requests, setRequests] = useState([
    { id: 1, tenant: "Rahul Sharma", property: "Studio Apartment", status: "Pending" },
    { id: 2, tenant: "Priya Patel", property: "Studio Apartment", status: "Pending" },
  ]);

  // ✅ Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  // ✅ Handle image upload (frontend only)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProperty({ ...newProperty, image: imageUrl });
    }
  };

  // ✅ Add new property
  const addProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) return;
    setProperties([
      ...properties,
      { id: Date.now(), ...newProperty, applications: 0 },
    ]);
    setNewProperty({ title: "", location: "", price: "", image: "" });
  };

  // ✅ Delete property
  const deleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  // ✅ Handle tenant request
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button onClick={addProperty}>Add Property</button>
      </div>

      {/* My Properties */}
      <div className="my-properties">
        <h3>My Properties</h3>
        {properties.length > 0 ? (
          properties.map((p) => (
            <div key={p.id} className="property-card">
              {p.image && (
                <img src={p.image} alt={p.title} />
              )}
              <h4>{p.title}</h4>
              <p>{p.location}</p>
              <p>₹{p.price.toLocaleString()}</p>
              <p>Applications: {p.applications}</p>
              <button
                className="delete-btn"
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
              <p>
                <strong>{req.tenant}</strong> applied for{" "}
                <em>{req.property}</em>
              </p>
              <p>
                Status: <span>{req.status}</span>
              </p>
              {req.status === "Pending" && (
                <div className="request-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleRequest(req.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
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
