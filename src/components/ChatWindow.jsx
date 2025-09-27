import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import { FiSend, FiPaperclip } from "react-icons/fi";

export default function ChatWindow({ room, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = "agent@mail.com"; // sementara hardcoded

  // Update comments ketika room berubah
  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments, room]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // cegah pesan kosong

    const newComment = {
      id: Date.now(),
      type: "text",
      message: newMessage,
      sender: currentUser,
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
        <h2 className="text-lg font-semibold">{room.name}</h2>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList comments={comments} participants={room.participant} />
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white shadow-md flex space-x-2 items-center">
        {/* Upload Button */}
        <label className="cursor-pointer text-gray-600">
          <FiPaperclip size={22} />
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e)}
          />
        </label>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Tulis pesan..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        {/* Send Button */}
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
