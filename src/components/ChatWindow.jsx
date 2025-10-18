import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import { FiSend, FiPaperclip } from "react-icons/fi";

export default function ChatWindow({ room, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = "agent@mail.com"; // tetap hardcoded
  const listRef = useRef(null);

  // sinkron ketika room berubah (App.jsx mengirim room & initialComments)
  useEffect(() => {
    setComments(initialComments || []);
    // scroll to bottom ketika ganti room
    setTimeout(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 50);
  }, [initialComments, room]);

const handleSendMessage = () => {
  if (newMessage.trim() === "") return;

  const newComment = {
    id: Date.now(),
    type: "text",
    message: newMessage,
    sender: currentUser,
    timestamp: new Date().toISOString(), 
  };

  setComments((prev) => [...prev, newComment]);
  setNewMessage("");
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileUrl = URL.createObjectURL(file);

  const newComment = {
    id: Date.now(),
    type: file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
      ? "video"
      : "file",
    message: fileUrl,
    sender: currentUser,
    fileName: file.name,
    timestamp: new Date().toISOString(), 
  };

  setComments((prev) => [...prev, newComment]);
};


  if (!room) return <div className="p-4">Loading chat...</div>;

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">{room.name}</h2>
          <p className="text-xs text-gray-500">
            {room.type === "group" ? `${room.participant.length} participants` : "Private chat"}
          </p>
        </div>
      </div>

      {/* Message List */}
      <div ref={listRef} className="flex-1 overflow-y-auto p-4">
        <MessageList comments={comments} participants={room.participant} roomType={room.type} />
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white shadow-md flex space-x-2 items-center">
        <label className="cursor-pointer text-gray-600">
          <FiPaperclip size={22} />
          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e)} />
        </label>

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
