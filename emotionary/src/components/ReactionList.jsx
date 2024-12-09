import React, { useEffect, useState } from "react";
import { fetchMedia } from "../api/api";

function ReactionList({ reactions }) {
    const [media, setMedia] = useState([]);
    const fetchfunc = async() => {
        const mediaContent = await fetchMedia()
        console.log(mediaContent)
        setMedia(mediaContent)
    }

    useEffect(() => {
        fetchfunc()
    }, [])

  if (!reactions || reactions.length === 0) {
    return <p>No reactions found.</p>;
  }


  return (
    <ul>
        {reactions.map((reaction, index) => {
            console.log("media in map", media, reactions)
            const match = media.find((item) => item.id === String(reaction.mediaId));
            
            return (
                <li key={index}>
                    <p><strong>Emotion:</strong> {reaction.emotionType}</p>
                    <p>{reaction.description}</p>
                    <p><strong>Timestamp:</strong> {new Date(reaction.timestamp).toLocaleString()}</p>
                    <a href={(match.url)}>URL: {match ? match.url : 'Not found'}</a>
                </li>
            );
        })}
    </ul>
  );
}

export default ReactionList;
