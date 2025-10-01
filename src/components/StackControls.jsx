import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { push, pop } from "../store/slices/stackSlice";

export default function StackControls() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handlePush = () => {
    if (value.trim() === "") return;
    dispatch(push(value));
    setValue("");
  };

  const handlePop = () => {
    dispatch(pop());
  };

  return (
    <div className="card">
      <h3>Controles de la pila</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Elemento a agregar"
      />
      <button className="btn" onClick={handlePush}>
         Agregar
      </button>
      <button className="btn" onClick={handlePop}>
         Eliminar último
      </button>
    </div>
  );
}
