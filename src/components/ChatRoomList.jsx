import React from "react";

export default function ChatRoomList({ rooms, onSelectRoom, activeRoomId }) {
  return (
    <div className="w-[300px] h-full bg-white border-r overflow-y-auto">
      {rooms.map((item) => (
        <div
          key={item.room.id}
          onClick={() => onSelectRoom(item)}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
            activeRoomId === item.room.id ? "bg-gray-200" : ""
          }`}
        >
          <img
            src={item.room.image_url}
            alt={item.room.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{item.room.name}</p>
            <p className="text-sm text-gray-500">
              {item.comments[item.comments.length - 1]?.message || "No messages"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

