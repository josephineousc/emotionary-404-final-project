import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import MediaDetail from "./pages/MediaDetail";
import LogEmotion from "./pages/LogEmotion";
import About from "./pages/About";
import "./App.css";

function App() {
  const currentUserId = 1; // default to user ID 1

  return (
    <Router>
      <div className="app-container">
        {/* App Header */}
        <header className="app-header">
          <h1 className="app-title">Emotionary</h1>
          <p className="app-subtitle">Capture and share your emotional connections with media</p>
        </header>

        {/* Navigation Bar */}
        <nav className="app-nav">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to={`/profile/${currentUserId}`} className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/log-emotion" className={({ isActive }) => (isActive ? "active" : "")}>
                Log Emotion
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* App Routes */}
        <main className="app-main">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Search Page */}
            <Route path="/search" element={<Search />} />

            {/* User Profile Page */}
            <Route path="/profile/:userId" element={<Profile />} />

            {/* Media Details Page */}
            <Route path="/media/:mediaId" element={<MediaDetail />} />

            {/* Log Emotion Page */}
            <Route path="/log-emotion" element={<LogEmotion />} />

            {/* About Page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
