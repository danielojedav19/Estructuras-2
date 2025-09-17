import React, { useState } from "react";
import LinkedList from "../structures/LinkedList";

const mockSongs = ["Cancion A", "Cancion B", "Cancion C", "Cancion D"];

export default function LinkedListPage() {
  const [list] = useState(() => {
    const l = new LinkedList();
    mockSongs.forEach((s) => l.append(s));
    return l;
  });
  const [current, setCurrent] = useState(list.getCurrent());

  const handleNext = () => {
    setCurrent(list.next());
  };

  const handleReset = () => {
    setCurrent(list.reset());
  };

  return (
    <div>
      <h2>Lista enlazada - Playlist</h2>
      <p><b>Canción actual:</b> {current}</p>
      <button onClick={handleNext}>Siguiente</button>
      <button onClick={handleReset}>Reiniciar</button>
    </div>
  );
}
