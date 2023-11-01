import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RoomForm } from "./components";

function App() {
  fetch("/api/room")
    .then((response) => response.text())
    .then((data) => console.log(data));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomForm />} />
        <Route path="/room" element={<div>Room</div>} />
      </Routes>
    </Router>
  );
}

export default App;
