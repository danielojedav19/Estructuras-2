import React from "react";
import CounterView from "../components/CounterView";
import CounterControls from "../components/CounterControls";
import StackControls from "../components/StackControls";
import StackView from "../components/StackView";

export default function Challenge10Page() {
  return (
    <div className="page">
      <h1>Challenge 10 - Redux</h1>
      <p className="subtitle">
        Implementación de Counter y Stack con Redux Toolkit
      </p>

      <div className="layout">
        {/* Sección del contador */}
        <div className="section">
          <h2>Contador</h2>
          <CounterView />
          <CounterControls />
        </div>

        {/* Sección de la pila */}
        <div className="section">
          <h2>Pila </h2>
          <StackControls />
          <StackView />
        </div>
      </div>
    </div>
  );
}
