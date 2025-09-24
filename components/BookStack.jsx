import React from "react";

export default function BookStack({ books }) {
  if (!books || books.length === 0) {
    return <div className="card">La pila está vacía.</div>;
  }

  const topFirst = [...books].reverse();

  return (
    <div>
      <div className="stack-list">
        {topFirst.map((b, idx) => (
          <div key={b.ISBN || idx} className={`stack-item ${idx === 0 ? "top" : ""}`}>
            <div><b>{b.Name}</b> {idx === 0 && <span className="tag">TOP</span>}</div>
            <div>ISBN: {b.ISBN}</div>
            <div>Autor: {b.Author}</div>
            <div>Editorial: {b.Editorial}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
