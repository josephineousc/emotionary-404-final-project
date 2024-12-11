import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Home({ filter }) {
  const [emotions, setEmotions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch('http://localhost:4000/emotions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmotions(data);
      } catch (error) {
        console.error("Error details:", error);
        setError(error.message);
        toast.error("Failed to load emotions. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookmarks = async () => {
      try {
        const response = await fetch('http://localhost:4000/bookmarks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookmarks(data.map((bookmark) => bookmark.emotionId)); // Extract emotionIds
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchEmotions();
    fetchBookmarks();
  }, []);

  const handleSave = async (emotion) => {
    try {
      const response = await fetch('http://localhost:4000/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          emotionId: emotion.id,
          dateBookmarked: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBookmarks((prev) => [...prev, emotion.id]); // Add emotionId to bookmarks
      toast.success("Saved to library!");
    } catch (err) {
      toast.error("Failed to save");
      console.error("Save error:", err);
    }
  };

  const handleUnsave = async (emotionId) => {
    try {
      const bookmarkId = await fetch(`http://localhost:4000/bookmarks?emotionId=${emotionId}`)
        .then((res) => res.json())
        .then((data) => data[0]?.id);

      if (!bookmarkId) {
        throw new Error("Bookmark not found");
      }

      const response = await fetch(`http://localhost:4000/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBookmarks((prev) => prev.filter((id) => id !== emotionId)); // Remove emotionId from bookmarks
      toast.success("Removed from library!");
    } catch (err) {
      toast.error("Failed to remove");
      console.error("Remove error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/emotions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEmotions((prev) => prev.filter((emotion) => emotion.id !== id)); // Remove from emotions
      toast.success("Deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete");
      console.error("Delete error:", err);
    }
  };

  const filteredEmotions = emotions.filter(
    (emotion) => filter === 'All' || emotion.media === filter
  );

  if (loading) return <div className="content">Loading...</div>;
  if (error) return <div className="content">Error: {error}</div>;

  return (
    <div className="card-grid">
      {filteredEmotions.length > 0 ? (
        filteredEmotions.map((emotion) => (
          <div key={emotion.id} className="card">
            <div className="card-content">
              <h3>{emotion.mediaTitle || emotion.title}</h3>
              {emotion.emotionType && <p className="emotion-type">{emotion.emotionType}</p>}
              <p className="description">{emotion.description}</p>
              {emotion.rating && <p className="rating">Rating: {emotion.rating}/5</p>}
              {emotion.timestamp && (
                <p className="timestamp">{new Date(emotion.timestamp).toLocaleDateString()}</p>
              )}
              {emotion.url && (
                <p className="url">
                  <a href={emotion.url} target="_blank" rel="noopener noreferrer">
                    View More
                  </a>
                </p>
              )}
              <div className="card-buttons">
                {bookmarks.includes(emotion.id) ? (
                  <button
                    onClick={() => handleUnsave(emotion.id)}
                    className="unsave-button"
                  >
                    UNSAVE
                  </button>
                ) : (
                  <button
                    onClick={() => handleSave(emotion)}
                    className="save-button"
                  >
                    SAVE
                  </button>
                )}
                <button
                  onClick={() => handleDelete(emotion.id)}
                  className="delete-button"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-emotions">No emotions found</div>
      )}
    </div>
  );
}

export default Home;
