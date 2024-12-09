import React from "react";

export default function ReactionList({ reactions }) {
  return (
    <div>
      {reactions.map((reaction) => (
        <div key={reaction.id} className="reaction-item">
          <h3>{reaction.emotionType}</h3>
          <p>{reaction.description}</p>
          <small>
            Submitted by User {reaction.userId} on{" "}
            {new Date(reaction.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
