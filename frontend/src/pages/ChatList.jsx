import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ChatList.css";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [myEmail, setMyEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/profile/me", { withCredentials: true })
      .then(res => {
        setMyEmail(res.data.email);
        return axios.get("http://localhost:3001/chat/my-chats", {
          params: { email: res.data.email }
        });
      })
      .then(res => {
        setChats(res.data); // list of chatrooms
      })
      .catch(err => console.error("Failed to load chats", err));
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-title">Chat</h1>
      </div>

      <div className="chat-list">
        {chats.map(chat => (
          <Link key={chat.chatroomID} to={`/chat-room/${chat.chatroomID}`} state={{
            chatroomName: chat.partnerName,
            partnerPic: chat.partnerPic
          }}>

            <div className="chat-item">
              <img src={`http://localhost:3001/uploads/${chat.partnerPic || 'default.png'}`} className="chat-avatar" />
              <div className="chat-content">
                <div className="chat-header-row">
                  <h3 className="chat-name">{chat.partnerName}</h3>
                  <span className="chat-time">{chat.timeSent ? new Date(chat.timeSent).toLocaleTimeString() : ""}</span>
                </div>
                <p className="chat-message">{chat.content || "Start the chat!"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
