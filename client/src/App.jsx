import { RoomForm } from "./components";

function App() {
  fetch("/api/room")
    .then((response) => response.text())
    .then((data) => console.log(data));

  return (
    <>
      <RoomForm />
    </>
  );
}

export default App;
