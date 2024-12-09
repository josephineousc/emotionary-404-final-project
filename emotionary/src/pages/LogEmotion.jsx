import React, { useState, useEffect } from "react";
import MediaPicker from "../components/MediaPicker";
import EmotionLogger from "../components/EmotionLogger";

export default function LogEmotion() {
  const [mediaOptions, setMediaOptions] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    document.title = "Log Emotion - Emotionary";
    fetch("http://localhost:3000/media")
      .then((response) => response.json())
      .then((data) => setMediaOptions(data))
      .catch((error) => console.error("Error fetching media options:", error));
  }, []);

  const handleSubmit = (reaction) => {
    const newEmotion = {
      ...reaction,
      mediaId: selectedMedia,
      description: details,
      timestamp: new Date().toISOString(),
    };

    fetch("http://localhost:3000/emotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmotion),
    })
      .then(() => alert("Emotion logged successfully!"))
      .catch((error) => console.error("Error logging emotion:", error));
  };

  return (
    <div>
      <h1>Log an Emotion</h1>
      <MediaPicker
        mediaOptions={mediaOptions}
        selectedMedia={selectedMedia}
        onMediaSelect={setSelectedMedia}
        onDetailChange={setDetails}
      />
      <EmotionLogger onSubmit={handleSubmit} />
    </div>
  );
}
