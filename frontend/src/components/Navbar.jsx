import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home", icon: "mdi:home-outline" },
    { label: "Discover", path: "/discover", icon: "mdi:compass-outline" },
    { label: "Chat", path: "/chat", icon: "mdi:chat-outline" },
    { label: "Profile", path: "/profile", icon: "mdi:account-outline" },
  ];

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-link ${
            location.pathname === item.path ? "active" : ""
          }`}
        >
          <div className="nav-item">
            <Icon
              icon={item.icon}
              className="nav-icon"
              color={location.pathname === item.path ? "#2e7d32" : "#b0b0b0"}
              width="28"
              height="28"
            />
            <small className="nav-label">{item.label}</small>
          </div>
        </Link>
      ))}
    </nav>
  );
}
