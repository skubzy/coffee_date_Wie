import React from "react";
import "../styles/CoffeeShopCard.css";

function CoffeeShopCard({ name, rating, reviews, distance, tags, onSuggest }) {
  return (
    <div className="coffee-card">
      <div className="shop-header">
        <h3>{name}</h3>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="rating-number">{rating}</span>
        </div>
      </div>
      <p className="review-count">{reviews} reviews</p>
      <p className="distance">{distance} away</p>
      <div className="tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"    
        className="suggest-btn"
        onClick={onSuggest}
      >
        Suggest this place
      </button>
    </div>
  );
}

export default CoffeeShopCard;
