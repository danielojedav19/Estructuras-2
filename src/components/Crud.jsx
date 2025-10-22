import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addNewItem,
  updateItemFirebase,
  deleteItemFirebase,
} from "../store/thunks/firebaseThunks";
import { useNavigate } from "react-router-dom";

export const Crud = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading, error } = useSelector((state) => state.firebase || {});
  const [form, setForm] = useState({ nombre: "", precio: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre) return alert("Agrega nombre");
    if (editId) {
      dispatch(updateItemFirebase(editId, form));
      setEditId(null);
    } else {
      dispatch(addNewItem(form));
    }
    setForm({ nombre: "", precio: "" });
  };

  const handleEdit = (item) => {
    setForm({ nombre: item.nombre, precio: item.precio });
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      dispatch(deleteItemFirebase(id));
    }
  };

  return (
    <div className="crud-container">
      <div className="dashboard-card crud-card">
        <h2 className="card-title">Gestión de Productos</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Volver al Dashboard
        </button>

        <form className="crud-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Precio del producto"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {editId ? "Actualizar" : "Agregar"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="crud-table">
          {items.length === 0 ? (
            <p>No hay productos registrados.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id}>
                    <td>{it.nombre}</td>
                    <td>${it.precio}</td>
                    <td>
                      <button onClick={() => handleEdit(it)}>Editar</button>
                      <button className="delete-btn" onClick={() => handleDelete(it.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
