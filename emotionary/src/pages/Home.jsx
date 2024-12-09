import React, { useEffect, useState } from "react";
import ReactionList from "../components/ReactionList";
import { fetchEmotions } from "../api/api";

function Home() {
  const [featuredReactions, setFeaturedReactions] = useState([]);

  useEffect(() => {
    fetchEmotions().then((data) => setFeaturedReactions(data.slice(0, 5))); // Fetch top 5 reactions
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Emotionary</h1>
      <p>Explore and share your emotional connections to media.</p>
      <h2>Featured Reactions</h2>
      <ReactionList reactions={featuredReactions} />
    </div>
  );
}

export default Home;
