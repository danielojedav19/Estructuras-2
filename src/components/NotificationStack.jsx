import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsThunk } from "../store/thunks/notificationsThunks";

export const NotificationStack = () => {
  const dispatch = useDispatch();
  const { stack, loading, error } = useSelector((state) => state.notifications);

  // Cargar notificaciones al iniciar
  useEffect(() => {
    dispatch(fetchNotificationsThunk());
  }, [dispatch]);

  if (loading) return <p>Cargando notificaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card">
      <h2>Notificaciones</h2>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {stack?.map((notif) => (
          <li
            key={notif.id}
            style={{
              background: notif.read ? "#161b22" : "#1c2128",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #30363d",
            }}
          >
            <strong style={{ color: "#58a6ff" }}>{notif.userName}</strong>
            <p style={{ margin: "5px 0" }}>{notif.message}</p>
            <small style={{ color: "#aaa" }}>{notif.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
