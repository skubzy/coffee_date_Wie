import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChatPage.css";

function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Emma",
      avatar: "👩",
      message: "Hey! Want to meet at Cozy Corner tomorrow?",
      timestamp: "2 min ago",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      avatar: "👤",
      message: "Sure! What time?",
      timestamp: "1 min ago",
      isOwn: true
    },
    {
      id: 3,
      sender: "Emma",
      avatar: "👩",
      message: "How about 3 PM? They have great iced mochas!",
      timestamp: "now",
      isOwn: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "You",
        avatar: "👤",
        message: inputMessage,
        timestamp: "now",
        isOwn: true
      }]);
      setInputMessage("");
    }
  };

  return (
    <div className="chat-page">
      {/* Chat Header */}
      <div className="chat-header">
        <button onClick={() => navigate("/")} className="back-btn">←</button>
        <div className="chat-info">
          <h2>Emma</h2>
          <p className="chat-location">☕ Cozy Corner (850m away)</p>
        </div>
        <button className="menu-btn">⋮</button>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.isOwn ? "own" : "other"}`}>
            {!msg.isOwn && <span className="avatar">{msg.avatar}</span>}
            <div className="message-bubble">
              {!msg.isOwn && <p className="sender-name">{msg.sender}</p>}
              <p className="message-text">{msg.message}</p>
              <p className="timestamp">{msg.timestamp}</p>
            </div>
            {msg.isOwn && <span className="avatar">{msg.avatar}</span>}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="message-input"
          />
          <button 
            className="send-btn"
            onClick={handleSendMessage}
          >
            ✈️
          </button>
        </div>
        <button className="heart-action">♥</button>
      </div>

      {/* Suggested Action */}
      <div className="suggested-action">
        <p>Mason chose to meet at:</p>
        <button className="cafe-suggestion">
          🍰 Cozy Corner Coffee (850m away)
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
