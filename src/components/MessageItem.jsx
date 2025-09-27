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
      {message.type === "text" && (
  <p className="text-gray-800">{message.message}</p>
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
    className="underline text-blue-500 text-sm"
  >
    {message.fileName}
  </a>
)}


      {/* Avatar untuk pesan kita sendiri (optional, bisa dihapus) */}
      {isSender && (
        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center ml-2">
          {sender?.name?.[0]}
        </div>
      )}
    </div>
  );
}
