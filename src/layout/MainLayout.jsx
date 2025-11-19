import AppRouter from "../routes/AppRouter";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Parcial 3 - Ciudades y Zonas Verdes</h1>
          <p className="app-subtitle">
            Red de ciudades (grafo) y zonas verdes jerárquicas (árbol N-ario)
          </p>
        </div>
      </header>

      <main className="app-main">
        <AppRouter />
      </main>

      <footer className="app-footer">
        Hecho por Daniel Ojeda
      </footer>
    </div>
  );
}
