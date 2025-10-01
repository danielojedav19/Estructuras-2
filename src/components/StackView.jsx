import React from "react";
import { useSelector } from "react-redux";

export default function StackView() {
  const stack = useSelector((state) => state.stack.stack);

  if (stack.length === 0) {
    return <p>La pila está vacía.</p>;
  }

  return (
    <div className="card">
      <h3>Contenido de la pila </h3>
      <ul>
        {[...stack].reverse().map((item, index) => (
          <li key={index} style={{ fontWeight: index === 0 ? "bold" : "normal" }}>
            {item} {index === 0 && <span style={{ color: "green" }}> (TOP)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
