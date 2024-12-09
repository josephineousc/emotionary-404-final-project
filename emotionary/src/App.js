import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import MediaDetail from "./pages/MediaDetail";
import LogEmotion from "./pages/LogEmotion";
import About from "./pages/About";
import ReactionList from "./components/ReactionList";

// Placeholder data for reactions and bookmarks
const reactions = [
  { id: 1, content: "This scene was amazing!" },
  { id: 2, content: "It reminded me of my childhood." },
];
const bookmarks = [
  { id: 1, content: "Saved reaction about Inception." },
  { id: 2, content: "Saved reaction about a Queen song." },
];

function App() {
  return (
    <Router>
      <div>
        <nav>
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
              <NavLink to="/profile/1" className={({ isActive }) => (isActive ? "active" : "")}>
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:userId" element={<Profile />}>
            <Route path="reactions" element={<ReactionList reactions={reactions} />} />
            <Route path="bookmarks" element={<ReactionList reactions={bookmarks} />} />
          </Route>
          <Route path="/media/:mediaId" element={<MediaDetail />} />
          <Route path="/log-emotion" element={<LogEmotion />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
