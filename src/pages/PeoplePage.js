import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PeoplePage.css";

function PeoplePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("people");
  const [favorite, setFavorite] = useState({});

  const people = [
    {
      id: 1,
      name: "Miss Guy",
      distance: "8.6 km",
      drink: "Does lovelike a latte?",
      image: "👩",
      status: "Online"
    },
    {
      id: 2,
      name: "Alex Chen",
      distance: "2.3 km",
      drink: "Iced Americano lover",
      image: "👨",
      status: "Online"
    },
    {
      id: 3,
      name: "Sarah K",
      distance: "1.5 km",
      drink: "Cappuccino enthusiast",
      image: "👩",
      status: "Offline"
    }
  ];

  const toggleFavorite = (id) => {
    setFavorite(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="people-page">
      {/* Header */}
      <div className="people-header">
        <div className="header-top">
          <button onClick={() => navigate("/")} className="menu-btn" style={{ marginRight: '10px' }}>←</button>
          <h1>☕ People</h1>
          <button className="menu-btn">⋮</button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "people" ? "active" : ""}`}
            onClick={() => setActiveTab("people")}
          >
            People
          </button>
          <button 
            className={`tab ${activeTab === "online" ? "active" : ""}`}
            onClick={() => setActiveTab("online")}
          >
            Online Now
          </button>
          <button 
            className={`tab ${activeTab === "nearby" ? "active" : ""}`}
            onClick={() => setActiveTab("nearby")}
          >
            Near me
          </button>
        </div>
      </div>

      {/* People List */}
      <div className="people-list">
        {people.map(person => (
          <div key={person.id} className="person-item">
            <div className="person-avatar">{person.image}</div>
            <div className="person-info">
              <div className="person-header">
                <h3>{person.name}</h3>
                <button 
                  className={`heart-btn ${favorite[person.id] ? "liked" : ""}`}
                  onClick={() => toggleFavorite(person.id)}
                >
                  ♥
                </button>
              </div>
              <p className="person-distance">{person.distance}</p>
              <p className="person-drink">{person.drink}</p>
              <div className="person-status">
                <span className={`status-dot ${person.status === "Online" ? "online" : "offline"}`}></span>
                <span>{person.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="people-cta">
        <button onClick={() => navigate("/chat/1")} className="cta-btn">💬 Send a message</button>
      </div>
    </div>
  );
}

export default PeoplePage;
