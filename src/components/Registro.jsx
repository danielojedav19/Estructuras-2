import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerAuth,
  registerWithGoogle,
} from "../store/thunks/registerAuth";

export const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.name || !form.email || !form.password) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    if (form.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    await dispatch(registerAuth(form.email, form.password, form.name));

    navigate("/"); //Redirige al login
  };

  const handleGoogleRegister = async () => {
    await dispatch(registerWithGoogle());
    navigate("/"); //Redirige al login
  };

  return (
    <div className="layout-content">
      <div className="card">
        <h2 style={{ textAlign: "center", color: "#58a6ff" }}>
          Crear una cuenta
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          <button
            type="button"
            className="google"
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            Registrarme con Google
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};