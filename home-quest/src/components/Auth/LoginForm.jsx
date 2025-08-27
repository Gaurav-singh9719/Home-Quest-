import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Fixed credentials
  const credentials = {
    tenant: { email: "tenant@example.com", password: "tenant123" },
    owner: { email: "owner@example.com", password: "owner123" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === credentials.tenant.email && password === credentials.tenant.password) {
      login({ email, role: "tenant" }); // ✅ context update
      navigate("/tenant-dashboard");   // ✅ tenant redirect
    } else if (email === credentials.owner.email && password === credentials.owner.password) {
      login({ email, role: "owner" }); // ✅ context update
      navigate("/owner-dashboard");   // ✅ owner redirect
    } else {
      setError("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
