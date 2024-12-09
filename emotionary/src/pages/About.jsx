import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About - Emotionary";
  }, []);

  return (
    <div>
      <h1>About Emotionary</h1>
      <p>
        Emotionary is a platform where you can log and share emotional
        connections to media, such as movies, books, and songs.
      </p>
    </div>
  );
}
