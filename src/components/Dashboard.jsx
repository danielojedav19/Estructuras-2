import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        {/* === CARD GESTIÓN DE PUBLICACIONES === */}
        <div className="dashboard-card">
          <h2 className="card-title">Gestión de Publicaciones</h2>
          <p className="card-text">
            Crea, actualiza o elimina publicaciones almacenadas en Firebase
            Firestore.
          </p>
          <button
            className="crud-button"
            onClick={() => navigate("/crud")}
          >
            Gestionar
          </button>
        </div>

        {/* === CARD CHAT EN TIEMPO REAL === */}
        <div className="dashboard-card">
          <h2 className="card-title">Chat en Tiempo Real</h2>
          <p className="card-text">
            Envía y recibe mensajes instantáneamente usando Firebase Realtime Database.
          </p>
          <button
            className="crud-button"
            onClick={() => navigate("/chat")}
          >
            Ir al Chat
          </button>
        </div>
      </div>
    </div>
  );
};
