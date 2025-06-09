import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [myEmail, setMyEmail] = useState('');
  const [matchedUser, setMatchedUser] = useState(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('http://localhost:3001/profile/me', { withCredentials: true })
      .then(res => {
        setMyEmail(res.data.email);
        return axios.get('http://localhost:3001/profile/potential-users', { params: { email: res.data.email } });
      })
      .then(res => {
        setUsers(res.data);
        setCurrentUser(res.data[0]);
      })
      .catch(err => alert("Failed to load users"));
  }, []);

  const handleAction = async (type) => {
    if (!currentUser) return;

    await axios.post('http://localhost:3001/profile/action', {
      currentEmail: myEmail,
      targetEmail: currentUser.userEmail,
      action: type
    });

    if (type === 'match') {
      const isMutualMatch = currentUser.userMatches?.includes(myEmail);
      if (isMutualMatch) {
        setMatchedUser(currentUser);
        setShowMatchPopup(true);
        return; // Don't move to next card immediately
      }
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);
    setCurrentUser(users[nextIndex]);
  };

const handleStartChat = async () => {
  try {
    const res = await axios.post('http://localhost:3001/chat/start-chat', {
      chatroomName: `${myEmail}_${matchedUser.userEmail}`,
      senderEmail: myEmail,
      partnerEmail: matchedUser.userEmail
    }, { withCredentials: true });

    const roomID = res.data.chatroomID;

    navigate(`/chat-room/${roomID}`, {
      state: {
        chatroomName: matchedUser.userName,
        partnerPic: matchedUser.userProfilePic
      }
    });
  } catch (err) {
    alert("Failed to start chat");
    console.error(err);
  }
};


  return (
    <div className="home-page">
      <div className="scroll-container">
        {/* Header */}
        <div className="header">
          <h1>Skill Bridge</h1>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {currentUser ? (
            <>
              <div className="profile-card">
                {/* Profile Image */}
                <div className="profile-image-container">
                  <img
                    src={`http://localhost:3001/uploads/${currentUser.userProfilePic}`}
                    alt="profile"
                    className="profile-image"
                  />
                  <div className="profile-overlay">
                    <h2 className="profile-name">{currentUser.userName}, {currentUser.userAge}</h2>
                    <p className="profile-title">Im looking for:</p>
                    {/* Tags */}
                    <div className="tags-container">
                      {currentUser.userSearchedSkills?.split(',').map(tag => (
                        <span className="tag looking" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="content-section">
                  {/* About Me */}
                  <div className="section">
                    <h3>About Me</h3>
                    <p>{currentUser.userDescription}</p>
                  </div>

                  {/* Area of Skills */}
                  <div className="section">
                    <h3>Area of Skills</h3>
                    <div className="tags-container">
                      {currentUser.userSkills?.split(',').map(skill => (
                        <span className="tag tag-orange" key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Latest Project */}
                  {currentUser.userProjects && (
                    <div className="social-link">
                      <div className="icon-circle">
                        <Icon icon="mdi:link" color="white" width="20" height="20" />
                      </div>
                      <a href={currentUser.userProjects.split(',')[0]} target="_blank" rel="noreferrer">
                        {currentUser.userProjects.split(',')[0]}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-btn btn-close" onClick={() => handleAction('decline')}>
                  <Icon icon="mdi:close" />
                </button>
                <button className="action-btn btn-star" onClick={() => handleAction('match')}>
                  <Icon icon="mdi:star" />
                </button>
              </div>

              {/* Report */}
              <div className="report-section">
                <button className="report-btn">Block and Report</button>
              </div>
            </>
            
          ) : (
            <div className="empty-message-box">
              <p>No more profiles for now 😢</p>
            </div>
          )}
          
        </div>
      </div>

      {showMatchPopup && matchedUser && (
        <div className="match-popup">
          <div className="popup-content">
            <h2>🎉 It's a Match!</h2>
            <p>You and {matchedUser.userName} liked each other.</p>
            <img
              src={`http://localhost:3001/uploads/${matchedUser.userProfilePic}`}
              alt={matchedUser.userName}
              className="popup-avatar"
            />
            <button className="start-chat-btn" onClick={handleStartChat}>Start Chat</button>
            <button onClick={() => {
              setShowMatchPopup(false);
              const nextIndex = index + 1;
              setIndex(nextIndex);
              setCurrentUser(users[nextIndex]);
            }}>Maybe Later</button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}
