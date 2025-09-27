import React from "react";

export default function MessageItem({ message, participants }) {
  const sender = participants.find((p) => p.id === message.sender);
  const currentUser = "agent@mail.com"; // sementara hardcoded

  const isSender = message.sender === currentUser;

  return (
    <div className={`flex items-start mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      {/* Avatar ditampilkan hanya untuk lawan bicara */}
      {!isSender && (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-2">
          {sender?.name?.[0]}
        </div>
      )}

      {/* Bubble Chat */}
      <div
        className={`shadow p-3 rounded-lg max-w-xs ${
          isSender ? "bg-blue-500 text-white" : "bg-white text-gray-900"
        }`}
      >
        {!isSender && <p className="text-sm font-semibold">{sender?.name}</p>}
        <p>{message.message}</p>
      </div>

      {/* Avatar untuk pesan kita sendiri (optional, bisa dihapus) */}
      {isSender && (
        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center ml-2">
          {sender?.name?.[0]}
        </div>
      )}
    </div>
  );
}
