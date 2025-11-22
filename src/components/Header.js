// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo2.png';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="header-content">
        <img src={logo} className="App-logo" alt="Coffee Dates logo" />
        <div style={{ flex: 1 }}>
          <h1 className="header-title">Coffee Dates</h1>
          <p className="header-subtitle">Find the coziest coffee spot — and someone to share it with!</p>
        </div>

        <button
          className="header-auth-btn"
          aria-label="Sign in"
          onClick={() => navigate('/auth')}
        >
          <span className="auth-icon">👤</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
