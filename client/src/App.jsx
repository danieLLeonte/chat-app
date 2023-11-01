import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RoomForm, RoomPage } from "./components";

function App() {
  fetch("/api/room")
    .then((response) => response.text())
    .then((data) => console.log(data));

  return (
    <div className="flex justify-center items-center h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<RoomForm />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
