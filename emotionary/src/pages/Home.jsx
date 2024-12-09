import React, { useEffect, useState } from "react";
import ReactionList from "../components/ReactionList";

export default function Home() {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    document.title = "Home - Emotionary";
    fetch("http://localhost:3000/emotions?_expand=media&_expand=user")
      .then((response) => response.json())
      .then((data) => setReactions(data))
      .catch((error) => console.error("Error fetching reactions:", error));
  }, []);

  return (
    <div>
      <h1>Welcome to Emotionary</h1>
      <p>Log and share your emotional connections with media.</p>
      <ReactionList reactions={reactions} />
    </div>
  );
}
