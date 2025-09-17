import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import LinkedListPage from "./components/LinkedListPage";
import DoublyLinkedListPage from "./components/DoublyLinkedListPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Challenge 07 - Linked Lists</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/linked">Linked List</Link> |{" "}
          <Link to="/doubly/Pagina1">Doubly Linked List</Link>
        </nav>
        <hr />
        <Routes>
          {/* Playlist con lista simple */}
          <Route path="/linked" element={<LinkedListPage />} />

          {/* Historial con lista doblemente enlazada */}
          <Route path="/doubly/:page" element={<DoublyLinkedListPage />} />

          {/* Redirigir /doubly sin parámetro a Pagina1 */}
          <Route path="/doubly" element={<Navigate to="/doubly/Pagina1" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

