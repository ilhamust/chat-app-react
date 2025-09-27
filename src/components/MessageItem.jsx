import React from "react";

export default function MessageItem({ message, participants }) {
  const sender = participants.find((p) => p.id === message.sender);
  const currentUser = "agent@mail.com"; // sementara hardcoded

  const isSender = message.sender === currentUser;

 return (
  <div className={`flex items-start mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
    
    {/* Avatar untuk lawan bicara */}
    {!isSender && (
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-2">
        {sender?.name?.[0]}
      </div>
    )}

    {/* Bubble Wrapper */}
{/* Bubble Wrapper */}
<div
  className={`${
    message.type === "text"
      ? `p-3 rounded-2xl max-w-xs ${
          isSender
            ? "bg-blue-500 text-white shadow-md"
            : "bg-white text-gray-900 border border-gray-300 shadow-sm"
        }`
      : "max-w-xs" // <-- media tanpa border dan background
  }`}
>

      {/* Jika kamu ingin nama pengirim untuk lawan bicara */}
      {!isSender && (
        <p className="text-xs font-semibold mb-1 text-gray-500">{sender?.name}</p>
      )}

      {/* Konten Pesan */}
      {message.type === "text" && (
        <p className="text-sm">{message.message}</p>
      )}

      {message.type === "image" && (
        <img
          src={message.message}
          alt="uploaded"
          className="rounded-lg max-w-[200px] max-h-[200px] object-cover"
        />
      )}

      {message.type === "video" && (
        <video
          controls
          className="rounded-lg max-w-[200px] max-h-[200px]"
        >
          <source src={message.message} type="video/mp4" />
        </video>
      )}

      {message.type === "file" && (
        <a
          href={message.message}
          download={message.fileName}
          className="flex items-center space-x-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <span className="text-red-500 text-xl">📄</span>
          <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
            {message.fileName}
          </span>
        </a>
      )}
    </div>

    {/* Avatar untuk pesan kita sendiri (optional) */}
    {isSender && (
      <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center ml-2">
        {sender?.name?.[0]}
      </div>
    )}
  </div>
);

}
