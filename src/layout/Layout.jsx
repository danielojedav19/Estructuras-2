import { Outlet } from "react-router-dom";
import "../index.css";

export const Layout = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h2>Firebase Auth App</h2>
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        © 2025 - Proyecto Firebase Login
      </footer>
    </div>
  );
};
