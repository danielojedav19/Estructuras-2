import React from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      <div className="dashboard-row">
        <div className="dashboard-card">
          <h2>Gestión de Publicaciones</h2>
          <p className="dashboard-subtext">
            Administra tus publicaciones en Firebase: crea, edita o elimina
            registros fácilmente.
          </p>
          <button className="crud-button" onClick={() => navigate("/crud")}>
            Gestionar
          </button>
        </div>

        <div className="dashboard-card">
          <h2>Vista previa</h2>
          <p className="dashboard-subtext">
            Aquí podrás visualizar cómo lucen tus publicaciones antes de
            publicarlas oficialmente.
          </p>
          <button disabled className="disabled-btn">
            Próximamente
          </button>
        </div>
      </div>
    </div>
  );
};
