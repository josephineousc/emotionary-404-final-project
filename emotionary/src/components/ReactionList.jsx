import React from "react";

function ReactionList({ reactions }) {
  if (!reactions || reactions.length === 0) {
    return <p>No reactions found.</p>;
  }

  return (
    <ul>
      {reactions.map((reaction) => (
        <li key={reaction.id}>
          <p><strong>Emotion:</strong> {reaction.emotionType}</p>
          <p>{reaction.description}</p>
          <p><strong>Timestamp:</strong> {new Date(reaction.timestamp).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReactionList;
