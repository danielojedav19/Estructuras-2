import React, { useState } from "react";

const QueueForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !amount || !arrival) {
      alert("Por favor completa nombre, monto y fecha/hora de llegada.");
      return;
    }

    const ts = new Date(arrival).getTime();
    if (isNaN(ts)) {
      alert("Fecha/hora inválida.");
      return;
    }

    const newPerson = {
      name: name.trim(),
      amount: Number(amount),
      date: new Date(ts).toLocaleString(),
      timestamp: ts,
    };

    onAdd(newPerson);

    setName("");
    setAmount("");
    setArrival("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Monto a retirar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label style={{ fontSize: "0.85em", color: "#ddd" }}>
        Fecha y hora de llegada
      </label>
      <input
        type="datetime-local"
        className="datetime-input"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
      />

      <button type="submit">Agregar a la Cola</button>
    </form>
  );
};

export default QueueForm;
