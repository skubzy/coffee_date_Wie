import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CoffeeShopCard from "./components/CoffeeShopCard";
import PersonCard from "./components/PersonCard";
import CafesPage from "./pages/CafesPage";
import PeoplePage from "./pages/PeoplePage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import './App.css';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function HomePage() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      console.log("Location selected:", location);
    }
  };

  const defaultCenter = {
    lat: 45.4215,
    lng: -75.6998,
  };

  // Coffee shop data
  const coffeeShops = [
    {
      id: 1,
      name: "The Roastery",
      rating: 4.5,
      reviews: 230,
      distance: "2.1 km away",
      tags: ["Cozy", "Study spot", "Patio"]
    },
    {
      id: 2,
      name: "Brew Lab",
      rating: 4.2,
      reviews: 156,
      distance: "1.2 km away",
      tags: ["Cozy", "Study spot", "Patio"]
    },
    {
      id: 3,
      name: "Cozy Corner",
      rating: 4.6,
      reviews: 315,
      distance: "315 km away",
      tags: ["Cozy", "Romantic", "Patio"]
    },
    
    
  ];

  // People data
  const people = [
    {
      id: 1,
      name: "Emma",
      drink: "Iced Mocha",
      location: "The Roastery",
      note: "Ideal coffee date: Chatting about: lol"
    },
    {
      id: 2,
      name: "Daniel",
      drink: "Flat White",
      location: "Cozy Corner",
      note: "Brainstorming our latest project ideas"
    },
    {
      id: 3,
      name: "Sophia",
      drink: "Matcha Latte",
      location: "The Roastery",
      note: "Laughing over bad coffee puns"
    },
  ];

  return (
    <div className="Coffee Dates">
      {/* Hero Section - Header + Location (Full Screen) */}
      <div className="hero-section">
        <div className="header-wrapper">
          <Header/>
        </div>
        
        {/* Location Search Section */}
        <div className="location-section">
          <h2 className="location-title">Where are we meeting?</h2>
          
          <button className="location-btn">Use my location</button>
          
          <form onSubmit={handleLocationSubmit} className="search-form">
            <input
              type="text"
              placeholder="        Enter a city or area"
              value={location}
              onChange={handleLocationChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
      </div>



      <div style={{ height: "400px", width: "100%", marginTop: "24px" }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={defaultCenter}
            zoom={13}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </div>

      
      

      {/* Coffee Shops Section */}
      <section className="coffee-shops-section">
        <div style={{  justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Nearby Coffee Shops</h2>
        </div>
        <div className="coffee-shops-grid">
          {coffeeShops.map((shop) => (
            <CoffeeShopCard
              key={shop.id}
              name={shop.name}
              rating={shop.rating}
              reviews={shop.reviews}
              distance={shop.distance}
              tags={shop.tags}
              onSuggest={() => console.log(`Suggested: ${shop.name}`)}
            />
          ))}
        
        </div>
         <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' , marginTop: '20px' }}>
         <button onClick={() => navigate('/cafes')} style={{ background: '#6b4423', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>See All</button>
        </div>

      </section>

      {/* People Section */}
      <section className="people-section">
        <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>People who want coffee near you</h2>
          <button onClick={() => navigate('/people')} style={{ background: '#6b4423', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>See All</button>
        </div>
        <div className="people-grid">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              id={person.id}
              name={person.name}
              drink={person.drink}
              location={person.location}
              note={person.note}
              onInvite={() => navigate(`/chat/${person.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/chat/:personId" element={<ChatPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
