import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginEmailPassword, loginWithGoogle } from "../store/thunks/registerAuth";
import { Link } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Por favor completa todos los campos");
      return;
    }
    dispatch(loginEmailPassword(form.email, form.password));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="layout-content">
      <div className="card">
        <h2 style={{ textAlign: "center", color: "#58a6ff" }}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
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
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <button className="google" onClick={handleGoogleLogin}>
          Ingresar con Google
        </button>

        {error && <p className="error">{error}</p>}

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ color: "#58a6ff" }}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
