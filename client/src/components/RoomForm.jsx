import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/room?username=${username}&room=${room}`);
  };

  return (
    <div className="border rounded-lg px-14 py-12 flex flex-col gap-12">
      <h1 className="text-2xl font-bold">Welcome to Chat App</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => onSubmit(e)}>
        <input
          className="border rounded-lg p-2"
          type="text"
          name="username"
          placeholder="Enter your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border rounded-lg p-2"
          type="text"
          name="roomname"
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <button
          className="border rounded-lg p-2 bg-blue-500 text-white font-bold"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
