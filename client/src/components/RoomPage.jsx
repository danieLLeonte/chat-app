const RoomPage = () => (
  <>
    <div className="bg-gray-600 h-full w-1/5 min-w-fit text-white flex flex-col items-center py-4 px-10 gap-4">
      <h2 className="text-2xl font-bold">Users online</h2>
      <p>user1</p>
    </div>
    <div className="bg-gray-300 h-full w-4/5 py-4 px-10 flex flex-col gap-4 items-center">
      <h3 className="text-2xl font-bold">Connected in room Room1</h3>
      <div className="bg-white h-full w-full flex flex-col justify-between rounded-lg py-2 px-4">
        <div>
          <p>user1 joinded the room</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <input
            className="border rounded-lg p-2 w-full"
            type="text"
            placeholder="Enter your message"
          />
          <button
            className="border rounded-lg p-2 bg-blue-500 text-white font-bold"
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </>
);

export default RoomPage;
