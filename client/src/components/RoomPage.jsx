import { useEffect, useState } from "react";

import { useQuery } from "../utils/useQuery";

const RoomPage = () => {
  const query = useQuery();
  const roomname = query.get("roomname");
  const username = query.get("username");

  return (
    <>
      <div className="bg-gray-600 h-full w-1/5 min-w-fit text-white flex flex-col items-center py-4 px-10 gap-4">
        <h2 className="text-2xl font-bold">Users online</h2>
      </div>
      <div className="bg-gray-300 h-full w-4/5 py-4 px-10 flex flex-col gap-4 items-center">
        <h3 className="text-2xl font-bold">Connected in room {roomname}</h3>
        <div className="bg-white h-full w-full flex flex-col justify-between rounded-lg py-2 px-4">
          <div className="flex flex-col gap-4 h-full overflow-y-auto"></div>
          <div className="flex justify-between items-center gap-4">
            <input
              className="border rounded-lg p-2 w-full"
              type="text"
              placeholder="Enter your message"
            />
            <button className="border rounded-lg p-2 bg-blue-500 text-white font-bold">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
