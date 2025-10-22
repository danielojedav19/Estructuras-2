import { Outlet } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutFirebase } from "../store/thunks/registerAuth";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutFirebase());
    navigate("/");
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        {!user ? (
          <>Firebase Update/Delete App</>
        ) : (
          <>
            Bienvenido a Firebase Update/Delete
            <span className="header-user">, {user.displayName}</span>
          </>
        )}
      </header>

      {user && (
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}

      <main className="layout-content">
        <Outlet />
      </main>

      <footer className="layout-footer">© 2025 - Proyecto Firebase Store</footer>
    </div>
  );
};
