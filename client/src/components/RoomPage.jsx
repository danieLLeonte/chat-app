import { useEffect, useState } from "react";

import { useQuery } from "../utils/useQuery";
import { socket } from "../utils/socket";

const RoomPage = () => {
  const query = useQuery();
  const username = query.get("username");
  const room = query.get("room");

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") return;
    socket.emit("send-message", { username, message }, room);
    setMessage("");
    setMessages((prev) => [...prev, { username, message }]);
  };

  useEffect(() => {
    socket.emit("join-room", room, username);
    socket.on("allUsers-joined", (allUsers) => {
      setUsers(allUsers);
    });
    socket.emit("get-all-messages", room);
    socket.on("get-all-messages", (allMessages) => {
      setMessages(allMessages);
    });
    socket.on("receive-message", (recMessage) => {
      setMessages((prev) => [...prev, recMessage]);
    });

    return () => {
      socket.off("allUsers-joined");
      socket.off("get-all-messages");
      socket.off("receive-message");
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <div className="bg-gray-600 sm:h-full sm:w-1/5 min-w-fit text-white sm:flex flex-col items-center py-4 px-10 gap-4 h-36 overflow-y-auto shrink-0">
        <h2 className="text-2xl font-bold">Online Users:</h2>
        {users.map((user, index) => (
          <p key={index} className="text-lg font-bold">
            {user}
          </p>
        ))}
      </div>
      <div className="bg-gray-300 h-[83%] sm:h-full w-full sm:w-4/5 py-4 px-10 flex flex-col gap-4 items-center grow-0">
        <h3 className="text-2xl font-bold">Connected in room: {room}</h3>
        <div className="bg-white h-[95%] w-full flex flex-col justify-between rounded-lg py-2 px-4">
          <div className="flex flex-col gap-4 overflow-y-auto flex-grow-0">
            {messages.map(({ username, message }, index) => (
              <p key={message + index}>
                {username}: {message}
              </p>
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
    </div>
  );
};

export default RoomPage;
