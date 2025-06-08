import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
// import axios from 'axios';
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

    // Dropdown chips state
    const [skills, setSkills] = useState([
        "Propagation Techniques",
        "Herb Gardening",
        "Flower Arranging"
    ]);
    const [lookingFor, setLookingFor] = useState([
        "DIY / Crafting",
        "Cooking",
        "Woodworking Basics",
        "Soil Preparation"
    ]);
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [showLookingDropdown, setShowLookingDropdown] = useState(false);

    const skillOptions = [
        "Propagation Techniques",
        "Herb Gardening",
        "Flower Arranging",
        "Composting",
        "Seed Saving",
        "Pruning"
    ];
    const lookingOptions = [
        "DIY / Crafting",
        "Cooking",
        "Woodworking Basics",
        "Soil Preparation",
        "Irrigation",
        "Garden Design"
    ];

    const skillDropdownRef = useRef(null);
    const lookingDropdownRef = useRef(null);

    // useEffect(() => {
    //     axios.get('http://localhost:3001/profile/me', { withCredentials: true })
    //         .then(res => {
    //             setEmail(res.data.email);
    //             return axios.get('http://localhost:3001/profile/get-profile', { params: { email: res.data.email } });
    //         })
    //         .then(res => {
    //             setName(res.data.name || '');
    //             setAge(res.data.age || '');
    //             setAbout(res.data.about || '');
    //         })
    //         .catch(() => alert('Failed to load profile'));
    // }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
                setShowSkillDropdown(false);
            }
            if (lookingDropdownRef.current && !lookingDropdownRef.current.contains(event.target)) {
                setShowLookingDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // const handleSave = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:3001/profile/update-profile', {
    //             email,
    //             name,
    //             age,
    //             about
    //         });
    //         if (res.data.Status === "Profile updated successfully") {
    //             alert("Profile saved successfully!");
    //             setIsEditingName(false);
    //             setIsEditingAge(false);
    //         }
    //     } catch (err) {
    //         alert("Failed to save profile.");
    //     }
    // };

    // UI only: add/remove skill/looking chips
    const addSkill = (skill) => {
        if (!skills.includes(skill)) setSkills([...skills, skill]);
        setShowSkillDropdown(false);
    };
    const removeSkill = (skill) => setSkills(skills.filter(s => s !== skill));

    const addLooking = (item) => {
        if (!lookingFor.includes(item)) setLookingFor([...lookingFor, item]);
        setShowLookingDropdown(false);
    };
    const removeLooking = (item) => setLookingFor(lookingFor.filter(s => s !== item));

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
                                onBlur={() => { setIsEditingName(false); }}
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
                                onBlur={() => { setIsEditingAge(false); }}
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
                            onBlur={() => { }}
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">Area of Skills</h3>
                    <div className="section-card">
                        <div className="dropdown-chips-container" ref={skillDropdownRef}>
                            {skills.map(skill => (
                                <span className="chip tag orange" key={skill}>
                                    {skill}
                                    <span className="remove-icon" onClick={() => removeSkill(skill)}>&times;</span>
                                </span>
                            ))}
                            <button
                                className="dropdown-button"
                                type="button"
                                onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                            >
                                + Add
                            </button>
                            {showSkillDropdown && (
                                <ul className="dropdown-list">
                                    {skillOptions.filter(opt => !skills.includes(opt)).map(opt => (
                                        <li key={opt} onClick={() => addSkill(opt)}>{opt}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-title">Looking For</h3>
                    <div className="section-card">
                        <div className="dropdown-chips-container" ref={lookingDropdownRef}>
                            {lookingFor.map(item => (
                                <span className={`chip tag ${["Cooking", "Soil Preparation"].includes(item) ? "yellow" : "purple"}`} key={item}>
                                    {item}
                                    <span className="remove-icon" onClick={() => removeLooking(item)}>&times;</span>
                                </span>
                            ))}
                            <button
                                className="dropdown-button"
                                type="button"
                                onClick={() => setShowLookingDropdown(!showLookingDropdown)}
                            >
                                + Add
                            </button>
                            {showLookingDropdown && (
                                <ul className="dropdown-list">
                                    {lookingOptions.filter(opt => !lookingFor.includes(opt)).map(opt => (
                                        <li key={opt} onClick={() => addLooking(opt)}>{opt}</li>
                                    ))}
                                </ul>
                            )}
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
                // onClick={handleSave}
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
                {/* Logout Button */}
                <button
                    className="logout-button"
                    style={{
                        width: '100%',
                        margin: '32px 0 0 0',
                        padding: '12px',
                        background: '#fff',
                        color: '#e74c3c',
                        border: '1px solid #e74c3c',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s'
                    }}
                // onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
            <Navbar active="profile" />
        </div>
    );
}