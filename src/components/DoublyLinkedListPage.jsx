import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoublyLinkedList from "../structures/DoublyLinkedList";

const mockPages = ["Pagina1", "Pagina2", "Pagina3", "Pagina4"];

export default function DoublyLinkedListPage() {
  const navigate = useNavigate();
  const { page } = useParams(); // obtiene la página desde la URL

  const [list] = useState(() => {
    const l = new DoublyLinkedList();
    mockPages.forEach((p) => l.append(p));
    return l;
  });

  // Estado de la página actual
  const [current, setCurrent] = useState(list.getCurrent());

  // Cuando cambia la URL, actualizar current
  useEffect(() => {
    if (page) {
      let node = list.head;
      while (node && node.value !== page) {
        node = node.next;
      }
      if (node) list.current = node; // sincroniza el puntero
      setCurrent(page);
    }
  }, [page, list]);

  const handleNext = () => {
    const nextPage = list.next();
    setCurrent(nextPage);
    navigate(`/doubly/${nextPage}`);
  };

  const handlePrev = () => {
    const prevPage = list.prev();
    setCurrent(prevPage);
    navigate(`/doubly/${prevPage}`);
  };

  return (
    <div>
      <h2>Lista doblemente enlazada - Navegación</h2>
      <p><b>Página actual:</b> {current}</p>
      <button onClick={handlePrev}>Atrás</button>
      <button onClick={handleNext}>Adelante</button>
    </div>
  );
}
