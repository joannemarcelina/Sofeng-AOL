// src/pages/Discover.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Discover.css';
import axios from 'axios';

export default function Discover() {
  const [likedUser, setLikedUser] = useState(null);
  const [recommendedUser, setRecommendedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/profile/me', { withCredentials: true })
      .then(res => {
        return axios.get('http://localhost:3001/discover/data', {
          withCredentials: true, // also important
          params: { email: res.data.email }
        });
      })
      .then(res => {
        setLikedUser(res.data.likedUser);
        setRecommendedUser(res.data.recommendedUser);
      })
      .catch(() => alert('Failed to load discover data'));
  }, []);

  return (
    <div className="discover-page">
      <div className="chat-header">
        <h1 className="chat-title">Discover</h1>
      </div>
      <div className="content">
        <h2 className="section-title">Liked You</h2>
        <p className="section-subtitle">Check out people who liked your profile!</p>

        {likedUser && (
          <div className="card liked-card">
            <div className="card-image-container">
              <img src={`http://localhost:3001/uploads/${likedUser.userProfilePic}`} alt={likedUser.userName} className="card-img" />
              <div className="overlay">
                <h3 className="overlay-name">{likedUser.userName}, {likedUser.userAge}</h3>
                <div className="overlay-tags">
                  {likedUser.userSkills.split(',').map(skill => (
                    <span className="tag" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <h2 className="section-title">Recommended for You</h2>
        {recommendedUser && (
          <div className="card recommended-card">
            <div className="card-image-container">
              <img src={`http://localhost:3001/uploads/${recommendedUser.userProfilePic}`} alt={recommendedUser.userName} className="card-img" />
              <span className="badge">Based on Skills</span>
            </div>
            <div className="card-body">
              <h3 className="body-name">{recommendedUser.userName}, {recommendedUser.userAge}</h3>
              <span className="favorite-icon">☆</span>
            </div>
          </div>
        )}

        <p className="subtext">Based on your profile and past matches</p>
      </div>
      <Navbar />
    </div>
  );
}
