import { useEffect, useState } from "react";

import { useQuery } from "../utils/useQuery";
import { socket } from "../utils/socket";

const RoomPage = () => {
  const query = useQuery();
  const roomname = query.get("roomname");
  const username = query.get("username");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleSendMessage = () => {
    socket.emit("sendMessage", { username, roomname, message });
    setMessage("");
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { username, roomname });
  };

  //Displaying if new user has joined the room
  useEffect(() => {
    socket.connect();
    socket.emit("joined-user", { username, roomname });
    socket.on("joined-user", (data) => {
      setJoinedUsers([...joinedUsers, data.username]);
    });
    socket.on("chat", (data) => {
      setReceivedMessages([...receivedMessages, data]);
    });
    socket.on("typing", (data) => {
      setTypingUsers([...typingUsers, data.username]);
    });
    socket.on("online-users", (data) => {
      setOnlineUsers(data);
    });
  }, []);

  console.log(joinedUsers);

  return (
    <>
      <div className="bg-gray-600 h-full w-1/5 min-w-fit text-white flex flex-col items-center py-4 px-10 gap-4">
        <h2 className="text-2xl font-bold">Users online</h2>
        {onlineUsers.map((user, index) => (
          <p key={index}>{user}</p>
        ))}
      </div>
      <div className="bg-gray-300 h-full w-4/5 py-4 px-10 flex flex-col gap-4 items-center">
        <h3 className="text-2xl font-bold">Connected in room {roomname}</h3>
        <div className="bg-white h-full w-full flex flex-col justify-between rounded-lg py-2 px-4">
          <div className="flex flex-col gap-4 h-full overflow-y-auto">
            <div className="flex flex-col gap-2">
              {joinedUsers.map((user, index) => (
                <p key={`${index}-${user}`}>{user} has joined the room</p>
              ))}
              {receivedMessages.map((message, index) => (
                <p key={index}>
                  {message.username}: {message.message}
                </p>
              ))}
            </div>
            {typingUsers.map((user, index) => (
              <p key={index}>{user} is typing...</p>
            ))}
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              className="border rounded-lg p-2 w-full"
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={handleTyping}
            />
            <button
              className="border rounded-lg p-2 bg-blue-500 text-white font-bold"
              type="submit"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
