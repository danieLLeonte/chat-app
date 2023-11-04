import { useEffect, useState } from "react";

import { useQuery } from "../utils/useQuery";
import { socket } from "../utils/socket";

const RoomPage = () => {
  const query = useQuery();
  const username = query.get("username");
  const room = query.get("room");

  const [users, setUsers] = useState([username]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", message, room);
    setMessage("");
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    socket.emit("join-room", room);
    socket.on("receive-message", (recMessage) => {
      setMessages((prev) => [...prev, recMessage]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  return (
    <>
      <div className="bg-gray-600 h-full w-1/5 min-w-fit text-white flex flex-col items-center py-4 px-10 gap-4">
        <h2 className="text-2xl font-bold">Users online</h2>
        {users.map((user, index) => (
          <p key={index} className="text-lg font-bold">
            {user}
          </p>
        ))}
      </div>
      <div className="bg-gray-300 h-full w-4/5 py-4 px-10 flex flex-col gap-4 items-center">
        <h3 className="text-2xl font-bold">Connected in room {room}</h3>
        <div className="bg-white h-full w-full flex flex-col justify-between rounded-lg py-2 px-4">
          <div className="flex flex-col gap-4 h-full overflow-y-auto">
            {messages.map((message, index) => (
              <p key={message + index}>{message}</p>
            ))}
          </div>
          <div className="flex justify-between items-center gap-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <input
                className="border rounded-lg p-2 w-full"
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="border rounded-lg p-2 bg-blue-500 text-white font-bold"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
