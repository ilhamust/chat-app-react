import React from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ comments = [], participants = [], roomType = "single" }) {
  return (
    <div className="space-y-3">
      {comments.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          participants={participants}
          roomType={roomType}
        />
      ))}
    </div>
  );
}
