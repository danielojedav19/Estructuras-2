import React, { useState } from "react";

export default function BookForm({ onAddBook }) {
  const [Name, setName] = useState("");
  const [ISBN, setISBN] = useState("");
  const [Author, setAuthor] = useState("");
  const [Editorial, setEditorial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones basicas
    if (!Name.trim() || !ISBN.trim() || !Author.trim() || !Editorial.trim()) {
      alert("Completa todos los campos.");
      return;
    }

    const book = { Name: Name.trim(), ISBN: ISBN.trim(), Author: Author.trim(), Editorial: Editorial.trim() };
    const ok = onAddBook(book);
    if (ok) {
      // vaciar los inputs si se agregó correctamente
      setName("");
      setISBN("");
      setAuthor("");
      setEditorial("");
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>Formulario de Libros</h3>
      <input placeholder="Nombre" value={Name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} />
      <input placeholder="Author" value={Author} onChange={(e) => setAuthor(e.target.value)} />
      <input placeholder="Editorial" value={Editorial} onChange={(e) => setEditorial(e.target.value)} />
      <button className="btn" type="submit">Agregar</button>
    </form>
  );
}
