import React, { useState, useEffect, useRef } from "react";
import Queue from "../structures/Queue";
import QueueForm from "./QueueForm";
import QueueItem from "./QueueItem";

const QueuePage = () => {
  const [queue] = useState(new Queue());
  const [people, setPeople] = useState([]);
  const [lastServed, setLastServed] = useState(null);
  const seeded = useRef(false); // flag para no duplicar

  useEffect(() => {
    if (seeded.current) return; // si ya cargamos, no repetir
    seeded.current = true;

    const now = Date.now();
    const seed = [
      { name: "Ana", amount: 200, timestamp: now - 1000 * 60 * 60 * 3 },
      { name: "Luis", amount: 350, timestamp: now - 1000 * 60 * 60 * 1.5 },
      { name: "Carla", amount: 150, timestamp: now - 1000 * 60 * 30 },
    ];

    seed.forEach((p) => {
      queue.enqueue({ ...p, date: new Date(p.timestamp).toLocaleString() });
    });

    setPeople(queue.printOrdered());
  }, [queue]);

  const addPerson = (person) => {
    queue.enqueue(person);
    setPeople(queue.printOrdered());
  };

  const servePerson = () => {
    const served = queue.dequeueEarliest();
    if (!served) {
      alert("No hay personas en la cola.");
      return;
    }
    setLastServed(served);
    setPeople(queue.printOrdered());
  };

  return (
    <div className="container">
      <h1>ATM Queue - Challenge 9</h1>
      <QueueForm onAdd={addPerson} />

      <h2>Personas en la cola:</h2>
      {people.length === 0 ? (
        <p>No hay personas en la cola.</p>
      ) : (
        people.map((p, i) => <QueueItem key={i} index={i} person={p} />)
      )}

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={servePerson}>Atender a la primera persona (por hora)</button>

        {lastServed && (
          <div style={{ marginTop: 12, color: "#bfe3ff" }}>
            Atendido: <strong>{lastServed.name}</strong> — Retiró ${lastServed.amount}
            <br />
            Llegó: {lastServed.date}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueuePage;
