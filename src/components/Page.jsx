import React from "react";

export const Page = ({ title, children }) => {
  return (
    <div className="dashboard-card">
      <h2 className="card-title">{title}</h2>
      <p className="page-text">
        {children || "Contenido de ejemplo para esta sección."}
      </p>
    </div>
  );
};
