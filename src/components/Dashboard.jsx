import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutFirebase } from "../store/thunks/registerAuth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutFirebase());
    navigate("/");
  };

  return (
    <div className="card">
      <h2>Bienvenido, {user?.displayName?.toUpperCase()}</h2>
      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};
