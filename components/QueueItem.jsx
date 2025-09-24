import React from "react";

const QueueItem = ({ person, index }) => {
  return (
    <div className="queue-item">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>Turno {index + 1}</strong> — {person.name}
        </div>
        <div>
          <strong>${person.amount}</strong>
        </div>
      </div>
      <div style={{ fontSize: "0.85em", marginTop: 8, color: "#dcd6ff" }}>
        Llegó: {person.date}
      </div>
    </div>
  );
};

export default QueueItem;


