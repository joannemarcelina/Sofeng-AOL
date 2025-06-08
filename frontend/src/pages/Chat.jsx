import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Chat.css';

const Chat = () => {
    const [msg, setMsg] = useState('');

    const sendMessage = () => {
        if (!msg.trim()) return;
        // TODO: hook up to your send logic
        console.log('send:', msg);
        setMsg('');
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <Icon
                    icon="eva:arrow-back-outline"
                    className="back-button"
                    onClick={() => window.history.back()}
                />
                <img src="/path/to/kay.jpg" alt="Kay" className="profile-photo" />
                <span className="profile-name">Kay</span>
            </header>

            <div className="chat-content">
                <div className="day-separator">Yesterday</div>
                <div className="message sent">
                    Hello there, Kay! Nice to know you.
                </div>
                <div className="message received">
                    Hello, Meyci! Nice to know you too. Let’s be friend ^^
                </div>
                <div className="message sent">
                    Sounds great. I want to be friend too!
                </div>

                <div className="day-separator">Today</div>
                <div className="message sent">
                    What are you doing today?
                </div>
                <div className="message received">
                    I’m learning new vocabulary! Can you help me with this one?
                </div>
            </div>

            <footer className="chat-input">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="send-button" onClick={sendMessage}>
                        <Icon icon="mdi:send" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
