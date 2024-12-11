import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Library() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch("http://localhost:4000/bookmarks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError(error.message);
        toast.error("Failed to load bookmarks.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) return <div className="content">Loading...</div>;
  if (error) return <div className="content">Error: {error}</div>;

  return (
    <div className="card-grid">
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="card">
            <div className="card-content">
              <h3>{bookmark.mediaTitle}</h3>
              <p className="description">{bookmark.description}</p>
              {bookmark.rating && <p className="rating">Rating: {bookmark.rating}/5</p>}
              {bookmark.timestamp && (
                <p className="timestamp">
                  {new Date(bookmark.timestamp).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-emotions">No saved emotions found</div>
      )}
    </div>
  );
}

export default Library;
