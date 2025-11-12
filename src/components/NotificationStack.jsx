import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsThunk } from "../store/thunks/notificationsThunks";
import s from "./NotificationStack.module.scss";

export const NotificationStack = () => {
  const dispatch = useDispatch();
  const { stack, loading, error } = useSelector((state) => state.notifications);

  useEffect(() => { dispatch(fetchNotificationsThunk()); }, [dispatch]);

  if (loading) return <p>Cargando notificaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <span className={s.title}>Notificaciones</span>
        {/* combina estilo local + badge global */}
        <span className={`badge badge--info ${s.counter}`}>{stack?.length || 0}</span>
      </div>

      <ul className={s.list}>
        {stack?.map((n) => (
          <li key={n.id} className={`${s.item} ${!n.read ? s.unread : ""}`}>
            <strong className={s.name}>{n.userName}</strong>
            <p style={{ margin: "5px 0" }}>{n.message}</p>
            <small className={s.time}>{n.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
