import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="layout-container">
      <header className="layout-header">Challenge 16 — Amigos & Ciudades</header>

      <div className="nav-container">
        <Link to="/" className="back-btn">Home</Link>
        <Link to="/graph" className="back-btn">Graph</Link>
      </div>

      <main className="layout-content">
        <Outlet />
      </main>

      <footer className="layout-footer">© 2025 — Hecho por Daniel Ojeda</footer>
    </div>
  );
}
