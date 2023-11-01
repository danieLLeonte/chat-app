const RoomForm = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="border rounded-lg px-14 py-12 flex flex-col gap-12">
      <h1 className="text-2xl font-bold">Welcome to Chat App</h1>
      <form className="flex flex-col gap-4" action="/api/room" method="POST">
        <input
          className="border rounded-lg p-2"
          type="text"
          name="username"
          placeholder="Enter your Name"
          required
        />
        <input
          className="border rounded-lg p-2"
          type="text"
          name="roomname"
          placeholder="Enter Room Name"
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
  </div>
);

export default RoomForm;
