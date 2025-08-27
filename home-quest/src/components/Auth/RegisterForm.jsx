import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterForm.css";

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("⚠️ Please fill in all fields");
      return;
    }

    // ✅ Simulated registration
    const newUser = { name, email, role };

    login(newUser); // Save in context

    if (role === "tenant") {
      navigate("/tenant-dashboard");
    } else {
      navigate("/owner-dashboard");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="tenant">Tenant</option>
        <option value="owner">Owner</option>
      </select>

      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
