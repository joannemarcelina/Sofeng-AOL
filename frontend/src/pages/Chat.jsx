import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import './Chat.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
    const { chatroomID } = useParams(); // from URL
    const location = useLocation();
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [myID, setMyID] = useState(null);
    const [chatroomName, setChatroomName] = useState('');
    const [partnerPic, setPartnerPic] = useState('');
    const [loading, setLoading] = useState(true);

    // Get my ID once on mount
    useEffect(() => {
        axios.get('http://localhost:3001/profile/me', { withCredentials: true })
            .then(res => {
                setMyID(res.data.id);
                setLoading(false); // ✅ Now ready
            })
            .catch(err => {
                console.error('Failed to fetch user ID', err);
                setLoading(false);
            });
    }, []);


    // Load messages + chatroom info
    useEffect(() => {
        if (!chatroomID) {
            navigate('/chat');
            return;
        }

        axios.get('http://localhost:3001/chat/messages', {
            params: { chatroomID },
            withCredentials: true,
        })
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                console.error('Failed to load messages', err);
            });

        if (location.state) {
            setChatroomName(location.state.chatroomName);
            setPartnerPic(location.state.partnerPic);
        } else {
            setChatroomName('Skill Partner');
            setPartnerPic('/default-avatar.png');
        }
    }, [chatroomID, navigate, location.state]);



  // 🟩 Scroll to latest
    useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!msg.trim() || !myID) {
            console.warn("Message or sender ID is missing", { msg, myID });
            return;
        }

        const newMessage = {
            chatroomID,
            content: msg,
            senderID: myID,
        };

        console.log("📤 Sending message:", newMessage);

        axios.post('http://localhost:3001/chat/send', newMessage, { withCredentials: true })
            .then(() => {
            setMessages(prev => [...prev, {
                content: msg,
                senderID: myID,
                timeSent: new Date().toISOString(),
            }]);
            setMsg('');
            })
            .catch(err => {
            console.error('Send failed', err);
            });
    };


  return (
    <div className="chat-container">
      <header className="chat-header">
        <Icon
          icon="eva:arrow-back-outline"
          className="back-button"
          onClick={() => navigate(-1)}
        />
        <img src={partnerPic || "/default-avatar.png"} alt="Partner" className="profile-photo" />
        <span className="profile-name">{chatroomName || 'Skill Partner'}</span>
      </header>

      <div className="chat-content">
        {messages.map((m, index) => (
          <div key={index} className={`message ${m.senderID === myID ? 'sent' : 'received'}`}>
            {m.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <footer className="chat-input">
        <div className="input-group">
            <input
                type="text"
                disabled={!myID}
                placeholder="Type a message"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />

            <button
                disabled={!msg.trim() || !myID}
                onClick={sendMessage}
                className="send-button"
            >
                <Icon icon="mdi:send" />
            </button>


        </div>
      </footer>
    </div>
  );
};

export default Chat;
