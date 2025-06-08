// src/pages/Discover.js
import React from 'react';
import Navbar from '../components/Navbar';
import mariaImg from '../assets/maria.png';
import meylizerImg from '../assets/meylizer.png';
import './Discover.css';

export default function Discover() {
  return (
    <div className="discover-page">
      <div className="content">
        <h2 className="section-title">Liked You</h2>
        <p className="section-subtitle">Check out people who liked your profile!</p>

        <div className="card liked-card">
          <div className="card-image-container">
            <img src={mariaImg} alt="Maria" className="card-img" />
            <div className="overlay">
              <h3 className="overlay-name">Maria, 20</h3>
              <div className="overlay-tags">
                <span className="tag role-tag">Food Blogger</span>
                <span className="tag">Pastry</span>
                <span className="tag">Plating</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="section-title">Recommended for You</h2>
        <div className="card recommended-card">
          <div className="card-image-container">
            <img src={meylizerImg} alt="Meylizer" className="card-img" />
            <span className="badge">Senior Auditor</span>
          </div>
          <div className="card-body">
            <h3 className="body-name">Meylizer, 30</h3>
            <span className="favorite-icon">☆</span>
          </div>
        </div>

        <p className="subtext">Based on your profile and past matches</p>
      </div>
      <Navbar />
    </div>
  );
}
