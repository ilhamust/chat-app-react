import React from "react";

export default function MessageItem({ message, participants, roomType }) {
  const sender = participants.find((p) => p.id === message.sender) || {};
  const currentUser = "agent@mail.com"; // hardcoded sementara
  const isSender = message.sender === currentUser;

  return (
    <div className={`flex items-start mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      {/* Avatar untuk lawan bicara */}
      {!isSender && (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-2">
          {sender?.name?.charAt(0) || "?"}
        </div>
      )}

      {/* Bubble / Media wrapper */}
      <div
        className={`relative ${
          message.type === "text"
            ? `p-3 rounded-2xl max-w-xs ${isSender ? "bg-blue-500 text-white shadow-md" : "bg-white text-gray-900 border border-gray-200 shadow-sm"}`
            : "max-w-xs"
        }`}
      >
        {/* Nama pengirim (khusus group dan bukan current user) */}
        {roomType === "group" && !isSender && message.type === "text" && (
          <p className="text-xs font-semibold mb-1 text-gray-500">{sender.name}</p>
        )}

        {/* Konten pesan */}
        {message.type === "text" && (
          <p className={`${isSender ? "text-white" : "text-gray-800"} text-sm`}>
            {message.message}
          </p>
        )}

        {message.type === "image" && (
          <img
            src={message.message}
            alt="uploaded"
            className="rounded-lg max-w-[220px] max-h-[220px] object-cover"
          />
        )}

        {message.type === "video" && (
          <video controls className="rounded-lg max-w-[220px] max-h-[220px]">
            <source src={message.message} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {message.type === "file" && (
          <a
            href={message.message}
            download={message.fileName}
            className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition max-w-[220px]"
          >
            <span className="text-red-500 text-xl">📄</span>
            <span className="text-sm font-medium text-gray-700 truncate">
              {message.fileName || "file"}
            </span>
          </a>
        )}

        {/* (Optional) Timestamp kecil - tampilkan jika ada */}
        {message.timestamp && (
          <span className={`absolute text-[10px] text-gray-400 ${isSender ? "right-2" : "right-2"} bottom-[-18px`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>

      {/* Avatar untuk pesan kita sendiri (optional) */}
      {isSender && (
        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center ml-2">
          {sender?.name?.charAt(0) || "Me"}
        </div>
      )}
    </div>
  );
}
