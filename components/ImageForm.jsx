import { useState } from "react";

export default function ImageForm({ onAddImage }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !title) return alert("Debes completar ambos campos");
    onAddImage(id, title);
    setId("");
    setTitle("");
  }; 

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="number"
        placeholder="ID de la imagen"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Título de la imagen"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Agregar Imagen</button>
    </form>
  );
}
