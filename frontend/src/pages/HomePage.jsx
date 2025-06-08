import React from "react";
import { Icon } from "@iconify/react";
import "./HomePage.css";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <div className="header">
        <h1>Skill Bridge</h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="profile-card">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Nature photographer in forest"
              className="profile-image"
            />
            <div className="profile-overlay">
              <h2 className="profile-name">Damar, 19</h2>
              <p className="profile-title">Freelance Photographer</p>

              {/* Tags */}
              <div className="tags-container">
                <span className="tag looking">Looking for</span>
                <span className="tag looking">Model</span>
                <span className="tag looking">Content Creation</span>
                <span className="tag looking">Content Ideation</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            {/* About Me */}
            <div className="section">
              <h3>About Me</h3>
              <p>
                I love taking photo of nature and I'm looking for people who
                wants to have a collaboration as a model or taking a video about
                nature.
              </p>
            </div>

            {/* Area of Skills */}
            <div className="section">
              <h3>Area of Skills</h3>
              <div className="tags-container">
                <span className="tag tag-orange">Photography</span>
                <span className="tag tag-orange">Video Graphing</span>
                <span className="tag tag-orange">Photo Editing</span>
              </div>
            </div>

            {/* Latest Project */}
            <div className="social-link">
              <div className="icon-circle">
                <Icon icon="mdi:link" color="white" width="20" height="20" />
              </div>
              <a
                href="https://dribbble.com/damar"
                className="link-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://dribbble.com/damar
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn btn-close">
            <Icon icon="mdi:close" />
          </button>
          <button className="action-btn btn-star">
            <Icon icon="mdi:star" />
          </button>
        </div>

        {/* Report */}
        <div className="report-section">
          <button className="report-btn">Block and Report</button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
