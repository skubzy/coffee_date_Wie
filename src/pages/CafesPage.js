import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CafesPage.css";

function CafesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorite, setFavorite] = useState({});

  const cafes = [
    {
      id: 1,
      name: "Warm Cup Coffee",
      distance: "1.2 km away",
      tags: ["Cozy", "Outdoor patio"],
      rating: 4.8,
      reviews: 22,
      image: "☕"
    },
    {
      id: 2,
      name: "Bean Scene",
      distance: "3.1 km away",
      tags: ["Brunch for eat alone", "Great for breakfast"],
      rating: 4.6,
      reviews: 28,
      image: "☕"
    },
    {
      id: 3,
      name: "Pop'n Preta",
      distance: "6.7 km away",
      tags: ["Eddy", "Quaint res"],
      rating: 4.7,
      reviews: 44,
      image: "☕"
    }
  ];

  const toggleFavorite = (id) => {
    setFavorite(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cafes-page">
      {/* Header */}
      <div className="cafes-header">
        <div className="header-top">
          <button onClick={() => navigate("/")} className="menu-btn" style={{ marginRight: '10px' }}>←</button>
          <h1>☕ Cafés</h1>
          <button className="menu-btn">⋮</button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button 
            className={`tab ${activeTab === "cozy" ? "active" : ""}`}
            onClick={() => setActiveTab("cozy")}
          >
            Cozy ▼
          </button>
          <button 
            className={`tab ${activeTab === "quick" ? "active" : ""}`}
            onClick={() => setActiveTab("quick")}
          >
            Quick bite: 🥐
          </button>
          <button 
            className={`tab ${activeTab === "laptop" ? "active" : ""}`}
            onClick={() => setActiveTab("laptop")}
          >
            Laptop friendly
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for cafes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Cafes List */}
      <div className="cafes-list">
        {filteredCafes.map(cafe => (
          <div key={cafe.id} className="cafe-item">
            <div className="cafe-image">{cafe.image}</div>
            <div className="cafe-info">
              <div className="cafe-header">
                <h3>{cafe.name}</h3>
                <button 
                  className={`heart-btn ${favorite[cafe.id] ? "liked" : ""}`}
                  onClick={() => toggleFavorite(cafe.id)}
                >
                  ♥
                </button>
              </div>
              <p className="cafe-distance">{cafe.distance}</p>
              <div className="cafe-tags">
                {cafe.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <div className="cafe-rating">
                <span className="stars">★★★★★</span>
                <span className="review-count">{cafe.reviews} res</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CafesPage;
