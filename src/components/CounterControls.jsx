import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement, incrementBy } from "../store/slices/counterSlice";

export default function CounterControls() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleIncrementBy = () => {
    if (isNaN(value) || value === "") return;
    dispatch(incrementBy(Number(value)));
  };

  return (
    <div className="card">
      <h3>Controles del contador</h3>
      <button className="btn" onClick={() => dispatch(increment())}>
        + Incrementar
      </button>
      <button className="btn" onClick={() => dispatch(decrement())}>
        - Decrementar
      </button>
      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor a incrementar"
        />
        <button className="btn" onClick={handleIncrementBy}>
          Incrementar por valor
        </button>
      </div>
    </div>
  );
}
