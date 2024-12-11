import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Home({ filter }) {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch('http://localhost:3000/emotions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        setEmotions(data);
      } catch (error) {
        console.error('Error details:', error); // Debug log
        setError(error.message);
        toast.error('Failed to load emotions. Please make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmotions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/emotions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEmotions(emotions.filter(emotion => emotion.id !== id));
      toast.success('Deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete');
      console.error('Delete error:', err);
    }
  };

  const handleSave = async (emotion) => {
    try {
      const response = await fetch('http://localhost:3000/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          emotionId: emotion.id,
          dateBookmarked: new Date().toISOString()
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('Saved to library!');
    } catch (err) {
      toast.error('Failed to save');
      console.error('Save error:', err);
    }
  };

  const filteredEmotions = emotions.filter(emotion => 
    filter === 'All' || emotion.media === filter
  );

  if (loading) return <div className="content">Loading...</div>;
  if (error) return <div className="content">Error: {error}</div>;

  return (
    <div className="card-grid">
      {filteredEmotions.length > 0 ? (
        filteredEmotions.map(emotion => (
          <div key={emotion.id} className="card">
            <div className="card-content">
              <h3>{emotion.mediaTitle || emotion.title}</h3>
              {emotion.emotionType && (
                <p className="emotion-type">{emotion.emotionType}</p>
              )}
              <p className="description">{emotion.description}</p>
              {emotion.rating && (
                <p className="rating">Rating: {emotion.rating}/5</p>
              )}
              {emotion.timestamp && (
                <p className="timestamp">
                  {new Date(emotion.timestamp).toLocaleDateString()}
                </p>
              )}
              <div className="card-buttons">
                <button 
                  onClick={() => handleSave(emotion)} 
                  className="save-button"
                >
                  SAVE
                </button>
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