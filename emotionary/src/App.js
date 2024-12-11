import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Movies', 'Music', 'Social Media', 'Photography'];

  const [newEmotion, setNewEmotion] = useState({
    title: '',
    media: '',
    url: '',
    timestamp: '',
    rating: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmotion({ ...newEmotion, [name]: value });
  };

  const handleAddEmotion = (e) => {
    e.preventDefault();
    // We'll implement this later
    console.log("New emotion:", newEmotion);
  };

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h1>emotionary</h1>
          <input type="text" placeholder="Search" className="search-input" />
          
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <nav>
            <ul className="nav-list">
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/library">
                  Library
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="add-new">
            <h2>Add New</h2>
            <form className="new-form" onSubmit={handleAddEmotion}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={newEmotion.title}
                onChange={handleInputChange}
              />
              <select
                name="media"
                value={newEmotion.media}
                onChange={handleInputChange}
              >
                <option value="">Select Media</option>
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                <option value="Social Media">Social Media</option>
                <option value="Photography">Photography</option>
              </select>
              <input
                type="text"
                placeholder="URL"
                name="url"
                value={newEmotion.url}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Timestamp"
                name="timestamp"
                value={newEmotion.timestamp}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                name="rating"
                min="1"
                max="5"
                value={newEmotion.rating}
                onChange={handleInputChange}
              />
              <textarea
                placeholder="How does this media make you feel?"
                name="description"
                value={newEmotion.description}
                onChange={handleInputChange}
              />
              <button type="submit">POST</button>
            </form>
          </div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home filter={selectedFilter} />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;