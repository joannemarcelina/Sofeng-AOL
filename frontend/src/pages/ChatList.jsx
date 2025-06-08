// ChatList.js
import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "./ChatList.css";
import Navbar from "../components/Navbar";

export default function ChatList() {
  const chats = [
    {
      id: 1,
      name: "Maria",
      message: "Start the chat with Maria!",
      time: "11:19",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Kay",
      message: "Can you help me with this one?",
      time: "15:20",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1 className="chat-title">Chat</h1>
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {chats.map((chat) => (
          /* Option 1: Using React Router Link */
          <Link key={chat.id} to={`/chat-room`} className="chat-item-link">
            <div className="chat-item">
              {/* Avatar */}
              <img
                src={chat.avatar}
                alt={`${chat.name}'s avatar`}
                className="chat-avatar"
              />

              {/* Chat Info */}
              <div className="chat-content">
                <div className="chat-header-row">
                  <h3 className="chat-name">{chat.name}</h3>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <p className="chat-message">{chat.message}</p>
              </div>
            </div>
          </Link>

          /* Option 2: Using regular <a> tag (uncomment to use instead)
          <a
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="chat-item-link"
          >
            <div className="chat-item">
              <img
                src={chat.avatar}
                alt={`${chat.name}'s avatar`}
                className="chat-avatar"
              />
              <div className="chat-content">
                <div className="chat-header-row">
                  <h3 className="chat-name">{chat.name}</h3>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <p className="chat-message">{chat.message}</p>
              </div>
            </div>
          </a>
          */
        ))}
      </div>
      <Navbar />
    </div>
  );
}
