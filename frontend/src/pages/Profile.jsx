import React from 'react';
import { Icon } from '@iconify/react';
import Navbar from '../components/Navbar';
import profilePic from '../assets/profile.png';
import projectPic from '../assets/project.png';
import './Profile.css';

export default function Profile() {
    return (
        <div className="discover-page profile-page">
            <div className="content">
                <h2 className="profile-title">Profile</h2>
                <div className="profile-header">
                    <img
                        className="profile-photo"
                        src={profilePic}
                        alt="Mici"
                    />
                    <h3 className="profile-name">Mici, 19</h3>
                </div>
                <div className="list-group">
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:camera-outline" className="item-icon green" />
                            <span>Change Profile Photo</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:edit-2-outline" className="item-icon green" />
                            <span>Edit Name</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">About Me</h3>
                    <div className="about-card">
                        <p>
                            Hi there! I'm just a girl who loves getting her hands a little
                            dirty to make things grow. Taking care of my plants is my happy
                            place—they're like my leafy little friends. Watching them grow day
                            by day makes my heart smile!
                        </p>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">Area of Skills</h3>
                    <div className="section-card">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="What skill can you offer?"
                            />
                            <Icon icon="eva:plus-outline" className="plus-icon green" />
                        </div>
                        <div className="tags">
                            <span className="tag orange">Propagation Techniques</span>
                            <span className="tag orange">Herb Gardening</span>
                            <span className="tag orange">Flower Arranging</span>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">Looking For</h3>
                    <div className="section-card">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="What skill’s on your wishlist?"
                            />
                            <Icon icon="eva:plus-outline" className="plus-icon green" />
                        </div>
                        <div className="tags">
                            <span className="tag purple">DIY / Crafting</span>
                            <span className="tag yellow">Cooking</span>
                            <span className="tag purple">Woodworking Basics</span>
                            <span className="tag yellow">Soil Preparation</span>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">Latest Project</h3>
                    <div className="section-card">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="What have you been working on lately?"
                            />
                            <Icon icon="eva:plus-outline" className="plus-icon green" />
                        </div>
                        <a
                            className="project-link-group"
                            href="https://behance.com/mici"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon icon="eva:link-2-outline" className="link-icon green" />
                            <span>https://behance.com/mici</span>
                        </a>
                        <div className="project-preview">
                            <img
                                src={projectPic}
                                alt="Made with Soil and Heart"
                            />
                            <p className="caption">Made with Soil and Heart</p>
                            <p className="description">
                                I gave this porch a little glow-up: tidied, planted, and watched it bloom into something soft and lovely. Every pot, every flower has its own story now…
                            </p>
                        </div>
                    </div>
                </div>
                <div className="list-group">
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:bell-outline" className="item-icon" />
                            <span>Notifications</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider" />
                        </label>
                    </div>
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:lock-outline" className="item-icon" />
                            <span>Privacy and Security</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                </div>
                <div className="list-group">
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:question-mark-circle-outline" className="item-icon" />
                            <span>Help and Support</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:info-outline" className="item-icon" />
                            <span>About US</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                </div>
            </div>
            <Navbar active="profile" />
        </div>
    );
}