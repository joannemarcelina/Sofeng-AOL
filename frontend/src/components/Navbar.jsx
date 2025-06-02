import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
  const location = useLocation()

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Discover", path: "/discover", icon: "🔍" },
    { label: "Chat", path: "/chat", icon: "💬" },
    { label: "Profile", path: "/profile", icon: "👤" },
  ]

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} className={`nav-link ${location.pathname === item.path ? "active" : ""}`}>
          <div className="nav-item">
            <div className="nav-icon">{item.icon}</div>
            <small className="nav-label">{item.label}</small>
          </div>
        </Link>
      ))}
    </nav>
  )
}
