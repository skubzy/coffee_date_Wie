import React from "react";
import '../styles/PersonCard.css';

function PersonCard({ name, drink, location, note, onInvite }) {
  return (
    <div className="person-card">
      <h4>{name}</h4>
      <p className="drink">{drink}</p>
      <p className="location">{location}</p>
      <p className="note">{note}</p>
      <button className="invite-btn" onClick={onInvite}>
        Send Coffee Invite
      </button>
    </div>
  );
}

export default PersonCard;
