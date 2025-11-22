import React, { useState } from "react";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const toggleMode = () => setMode((m) => (m === "login" ? "register" : "login"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      console.log("Logging in with", { email: form.email, password: form.password });
      // TODO: call auth API
    } else {
      if (form.password !== form.confirm) {
        alert("Passwords do not match");
        return;
      }
      console.log("Registering", form);
      // TODO: call register API
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-logo">☕</div>
          <h1 className="auth-title">{mode === "login" ? "Welcome back" : "Create an account"}</h1>
          <p className="auth-sub">{mode === "login" ? "Sign in to continue to Coffee Dates" : "Sign up and start meeting for coffee"}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label className="field">
              <span className="label">Full name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
          )}

          <label className="field">
            <span className="label">Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>

          {mode === "register" && (
            <label className="field">
              <span className="label">Confirm password</span>
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required />
            </label>
          )}

          <div className="form-actions">
            <button type="submit" className="primary">
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
            <button type="button" className="ghost" onClick={toggleMode}>
              {mode === "login" ? "Create an account" : "Have an account? Sign in"}
            </button>
          </div>
        </form>

        <div className="auth-divider">or</div>

        <div className="social-row">
          <button className="social">Continue with Google</button>
          <button className="social">Continue with Apple</button>
          <button className="social">Continue with Github</button>
        </div>
      </div>
    </div>
  );
}
