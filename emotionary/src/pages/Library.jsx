import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Library() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmarksResponse = await fetch("http://localhost:4000/bookmarks");
        if (!bookmarksResponse.ok) {
          throw new Error(`HTTP error! status: ${bookmarksResponse.status}`);
        }
        const bookmarksData = await bookmarksResponse.json();

        const emotionsResponse = await fetch("http://localhost:4000/emotions");
        if (!emotionsResponse.ok) {
          throw new Error(`HTTP error! status: ${emotionsResponse.status}`);
        }
        const emotionsData = await emotionsResponse.json();

        const bookmarksWithEmotions = bookmarksData.map((bookmark) => ({
          ...bookmark,
          emotion: emotionsData.find((emotion) => emotion.id === bookmark.emotionId),
        }));

        setBookmarks(bookmarksWithEmotions);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        toast.error("Failed to load bookmarks.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="content">Loading...</div>;
  if (error) return <div className="content">Error: {error}</div>;

  return (
    <div className="card-grid">
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => {
          const emotion = bookmark.emotion;
          if (!emotion) {
            return (
              <div key={bookmark.id} className="card">
                <div className="card-content">
                  <p>Error: Emotion data missing for this bookmark.</p>
                </div>
              </div>
            );
          }

          return (
            <div key={bookmark.id} className="card">
              <div className="card-content">
                <h3>{emotion.mediaTitle || emotion.title}</h3>
                {emotion.emotionType && <p className="emotion-type">{emotion.emotionType}</p>}
                <p className="description">{emotion.description}</p>
                {emotion.rating && <p className="rating">Rating: {emotion.rating}/5</p>}
                {emotion.timestamp && (
                  <p className="timestamp">
                    {new Date(emotion.timestamp).toLocaleDateString()}
                  </p>
                )}
                {emotion.url && (
                  <p className="url">
                    <a href={emotion.url} target="_blank" rel="noopener noreferrer">
                      View More
                    </a>
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-emotions">No saved emotions found</div>
      )}
    </div>
  );
}

export default Library;
