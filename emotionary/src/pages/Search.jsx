import React, { useEffect, useState } from "react";
import ReactionList from "../components/ReactionList";

export default function Search() {
  const [query, setQuery] = useState("");
  const [filteredReactions, setFilteredReactions] = useState([]);

  useEffect(() => {
    document.title = "Search - Emotionary";
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:3000/emotions?q=${query}&_expand=media&_expand=user`)
      .then((response) => response.json())
      .then((data) => setFilteredReactions(data))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  return (
    <div>
      <h1>Search Reactions</h1>
      <input
        type="text"
        placeholder="Search by keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ReactionList reactions={filteredReactions} />
    </div>
  );
}
