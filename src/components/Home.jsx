import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page"> 
      <div className="home-container">
        <div className="dashboard-card home-card">
          <h1 className="card-title">Bienvenido al Challenge 14</h1>
          <p className="home-subtitle">
            Árbol Binario de Búsqueda (BST): inserta una serie de números,
            imprime los recorridos (inorder, preorder, postorder) y visualiza el árbol.
          </p>

          <button className="home-cta" onClick={() => navigate("/trees")}>
            Ir al TreeBST →
          </button>
        </div>
      </div>

      <footer className="layout-footer">Hecho por Daniel Ojeda</footer>
    </div>
  );
};
