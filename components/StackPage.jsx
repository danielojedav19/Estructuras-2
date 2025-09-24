import React, { useState } from "react";
import BookForm from "./BookForm";
import BookStack from "./BookStack";

// Mock data inicial 
const MOCK_BOOKS = [
  { Name: "Estructuras I", ISBN: "978-001", Author: "J. López", Editorial: "UAO" },
  { Name: "Algoritmos", ISBN: "978-002", Author: "D. Ojeda", Editorial: "TechPress" },
  { Name: "Estructuras II", ISBN: "978-003", Author: "M. Ruiz", Editorial: "UAO" },
];

export default function StackPage() {
  // Usamos array como stack: el último elemento es el TOP
  const [stack, setStack] = useState([...MOCK_BOOKS]);
  const [showStack, setShowStack] = useState(false); // nuevo estado para mostrar/ocultar

   
  const pushBook = (book) => {
    const exists = stack.some((b) => b.ISBN === book.ISBN);
    if (exists) {
      alert(`Ya existe un libro con ISBN ${book.ISBN}.`);
      return false;
    }
    setStack((prev) => [...prev, book]); // añade al final => top
    return true;
  };

  const popBook = () => {
    setStack((prev) => {
      if (prev.length === 0) {
        alert("La pila está vacía.");
        return prev;
      }
      const newArr = prev.slice(0, prev.length - 1);
      return newArr;
    });
  };

  const peek = () => {
    if (stack.length === 0) {
      alert("La pila está vacía.");
      return null;
    }
    const top = stack[stack.length - 1];
    alert(`Top (peek):\n${top.Name} — ISBN: ${top.ISBN}\nAutor: ${top.Author}`);
    return top;
  };

  const size = stack.length;
  const isEmpty = size === 0;

  const printStack = () => {
    const topFirst = [...stack].reverse();
    console.table(topFirst);
    setShowStack(!showStack); // alternar mostrar/ocultar
    return topFirst;
  };

  return (
    <div className="page">
      <h1>Pila de libros (Challenge 08)</h1>

      <div className="layout">
        <div className="left">
          <BookForm onAddBook={pushBook} />
          <div style={{ marginTop: 12 }}>
            <button onClick={popBook} className="btn">Eliminar Último</button>
            <button onClick={peek} className="btn">Ver top</button>
            <button onClick={printStack} className="btn">
              {showStack ? "Ocultar" : "Imprimir"}
            </button>
          </div>
          <div style={{ marginTop: 12 }}>
            <p><b>Tamaño:</b> {size} — <b>Vacía:</b> {isEmpty ? "Sí" : "No"}</p>
          </div>
        </div>

        <div className="right">
          {/* Solo muestra la pila si showStack === true */}
          {showStack && (
            <>
              <h3 className="stack-title">Contenido</h3>
              <BookStack books={stack} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
