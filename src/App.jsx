import React, { useState } from "react";
import chatData from "./data/chat.json";
import RoomList from "./components/ChatRoomList";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [activeRoom, setActiveRoom] = useState(chatData.results[0]);

  return (
    <div className="flex w-full h-screen">
      <RoomList
        rooms={chatData.results}
        onSelectRoom={setActiveRoom}
        activeRoomId={activeRoom.room.id}
      />
      <ChatWindow
        room={activeRoom.room}
        initialComments={activeRoom.comments}
      />
    </div>
  );
}
