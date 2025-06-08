import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import profilePic from '../assets/profile.png';
import projectPic from '../assets/project.png';
import './Profile.css';

export default function Profile() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [about, setAbout] = useState('');
    const [email, setEmail] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAge, setIsEditingAge] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:3001/profile/me', { withCredentials: true })
        .then(res => {
            setEmail(res.data.email);
            return axios.get('http://localhost:3001/profile/get-profile', { params: { email: res.data.email } });
        })
        .then(res => {
            setName(res.data.name || '');
            setAge(res.data.age || '');
            setAbout(res.data.about || '');
        })
        .catch(() => alert('Failed to load profile'));
    }, []);

    const handleSave = async () => {
        try {
            const res = await axios.post('http://localhost:3001/profile/update-profile', {
                email,
                name,
                age,
                about
            });
            if (res.data.Status === "Profile updated successfully") {
                alert("Profile saved successfully!");
                // Exit editing mode
                setIsEditingName(false);
                setIsEditingAge(false);
            }
        } catch (err) {
            alert("Failed to save profile.");
        }
    };

    return (
        <div className="discover-page profile-page">
            <div className="content">
                <h2 className="profile-title">Profile</h2>
                <div className="profile-header">
                    <img
                        className="profile-photo"
                        src={profilePic}
                        alt="Profile Photo"
                    />
                    <div className="profile-info">
                        {isEditingName ? (
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => { saveField('name', name); setIsEditingName(false); }}
                            placeholder="Name"
                            className="profile-input name editing"
                            autoFocus
                            />
                        ) : (
                            <label className="profile-label">{name || "Name"}</label>
                        )}

                        {isEditingAge ? (
                            <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onBlur={() => { saveField('age', age); setIsEditingAge(false); }}
                            placeholder="Age"
                            className="profile-input age editing"
                            autoFocus
                            />
                        ) : (
                            <label className="profile-label age-label">{age || "Age"}</label>
                        )}
                    </div>
                </div>
                <div className="list-group">
                    <div className="list-item">
                        <div className="item-left">
                            <Icon icon="eva:camera-outline" className="item-icon green" />
                            <span>Change Profile Photo</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                    </div>
                    <div className="list-item" onClick={() => setIsEditingName(true)}>
                        <div className="item-left">
                            <Icon icon="eva:edit-2-outline" className="item-icon green" />
                            <span>Edit Name</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                        </div>

                        <div className="list-item" onClick={() => setIsEditingAge(true)}>
                        <div className="item-left">
                            <Icon icon="eva:edit-2-outline" className="item-icon green" />
                            <span>Edit Age</span>
                        </div>
                        <Icon icon="eva:arrow-ios-forward-outline" className="chevron" />
                        </div>
                </div>
                <div className="section">
                    <h3 className="section-title">About Me</h3>
                    <div className="about-card">
                        <textarea
                            className="about-textarea"
                            rows={4}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            onBlur={() => saveField('about', about)}
                            placeholder="Tell us about yourself..."
                        />

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

                <button
                    className="submit-button"
                    style={{ marginTop: '20px' }}
                    onClick={handleSave}
                    >
                    Save Profile
                </button>


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