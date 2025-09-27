import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import chatData from "../data/chat.json"; // ambil dummy JSON lokal
import { FiSend } from "react-icons/fi"; // Tambahkan di atas


export default function ChatWindow() {
  const [room, setRoom] = useState(null);
  const [comments, setComments] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // <- input state

  const currentUser = "agent@mail.com"; // sementara hardcoded

  useEffect(() => {
    if (chatData.results && chatData.results.length > 0) {
      const data = chatData.results[0];
      setRoom(data.room);
      setComments(data.comments);
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // cegah pesan kosong

    const newComment = {
      id: Date.now(), // ID unik sementara
      type: "text",
      message: newMessage,
      sender: currentUser,
    };

    setComments((prev) => [...prev, newComment]);
    setNewMessage(""); // reset input
  };

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
      <div className="p-4 bg-white shadow-md flex space-x-2">
        <input
          type="text"
          placeholder="Tulis pesan..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center"
        >
          <FiSend size={18} />
        </button>

      </div>
    </div>
  );
}
