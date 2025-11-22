import React, { useState, useRef } from "react";
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
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 45.4215, lng: -75.6998 }); // Ottawa default
  const navigate = useNavigate();
  const mapRef = useRef(null);

  // Triggered when map loads
  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  // Uses Places Library for client-side search (NO CORS proxy needed)
  const fetchPlaces = (locationQuery) => {
    if (mapRef.current && window.google) {
      const service = new window.google.maps.places.PlacesService(mapRef.current);
      const request = {
        query: `${locationQuery} coffee shop`,
        fields: ["name", "geometry"],
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results || []);
          if (results && results.length > 0) {
            setMapCenter({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            });
          }
        }
      });
    }
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchPlaces(location);
    }
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setMapCenter({ lat, lng });
      fetchPlaces(`${lat},${lng}`);
    });
  };

  // Example demo data
  const coffeeShops = [
    { id: 1, name: "The Roastery", rating: 4.5, reviews: 230, distance: "2.1 km away", tags: ["Cozy", "Study spot", "Patio"] },
    { id: 2, name: "Brew Lab", rating: 4.2, reviews: 156, distance: "1.2 km away", tags: ["Cozy", "Study spot", "Patio"] },
    { id: 3, name: "Cozy Corner", rating: 4.6, reviews: 315, distance: "315 km away", tags: ["Cozy", "Romantic", "Patio"] },
    // ...other demo shops as needed
  ];

  const people = [
    { id: 1, name: "Emma", drink: "Iced Mocha", location: "The Roastery", note: "Ideal coffee date: Chatting about: lol" },
    { id: 2, name: "Daniel", drink: "Flat White", location: "Cozy Corner", note: "Brainstorming our latest project ideas" },
    { id: 3, name: "Sophia", drink: "Matcha Latte", location: "The Roastery", note: "Laughing over bad coffee puns" },
    // ...other demo people
  ];

  return (
    <div className="Coffee Dates">
      <div className="hero-section">
        <div className="header-wrapper">
          <Header/>
        </div>
        <div className="location-section">
          <h2 className="location-title">Where are we meeting?</h2>
          <button className="location-btn" onClick={handleUseMyLocation}>Use my location</button>
          <form onSubmit={handleLocationSubmit} className="search-form">
            <input
              type="text"
              placeholder="Enter a city or area"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ height: "400px", width: "100%", marginTop: "24px" }}>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={mapCenter}
            zoom={13}
            onLoad={handleMapLoad}
          >
            {places.map((place, i) => (
              <Marker
                key={i}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                }}
                label={place.name}
                title={place.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Coffee Shops Section */}
      <section className="coffee-shops-section">
        <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Nearby Coffee Shops (Demo Data)</h2>
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
        <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', marginTop: '20px' }}>
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
