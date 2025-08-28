import React from "react";

export default function MessageItem({ message, participants }) {
  const sender = participants.find((p) => p.id === message.sender);

  return (
    <div className="flex items-start space-x-2">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        {sender?.name?.[0]}
      </div>

      {/* Bubble Chat */}
      <div className="bg-white shadow p-3 rounded-lg max-w-xs">
        <p className="text-sm font-semibold">{sender?.name}</p>

        {message.type === "text" && (
          <p className="text-gray-800">{message.message}</p>
        )}

        {/* nanti tambahkan render untuk image/video/pdf di step berikut */}
      </div>
    </div>
  );
}
