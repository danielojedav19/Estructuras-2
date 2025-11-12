import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="home-container">
        <div className="dashboard-card home-card">
          <h1 className="card-title">Bienvenido al Challenge 16</h1>
          <p className="home-subtitle">
            Grafos de Amigos y Ciudades: crea ciudades y personas, conéctalas
            (vive en) y define amistades. Visualiza la red con react-d3-graph.
          </p>

          <button className="home-cta" onClick={() => navigate("/graph")}>
            Ir al Grafo →
          </button>
        </div>
      </div>
    </div>
  );
}
