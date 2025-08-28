import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import chatData from "../data/chat.json"; // ambil dummy JSON lokal

export default function ChatWindow() {
  const [room, setRoom] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Ambil data room & comments dari JSON
    if (chatData.results && chatData.results.length > 0) {
      const data = chatData.results[0];
      setRoom(data.room);
      setComments(data.comments);
    }
  }, []);

  if (!room) return <div className="p-4">Loading chat...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <h2 className="text-lg font-semibold">{room.name}</h2>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList comments={comments} participants={room.participant} />
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Tulis pesan..."
          className="w-full p-2 border rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
}
