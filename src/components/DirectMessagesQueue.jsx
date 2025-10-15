import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageThunk, fetchMessagesThunk } from "../store/thunks/messagesThunks";

export const DirectMessagesQueue = () => {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((state) => state.directMessages);
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  // ✅ Cargar mensajes al iniciar
  useEffect(() => {
    dispatch(fetchMessagesThunk());
  }, [dispatch]);

  // ✅ Enviar mensaje
  const handleSendMessage = () => {
    if (!text.trim()) return alert("Escribe un mensaje");

    const userName = user?.displayName || "Anónimo";
    dispatch(addMessageThunk(userName, text));
    setText("");
  };

  if (loading) return <p>Cargando mensajes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card">
      <h2>Cola de Mensajes Directos</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un mensaje..."
        rows="3"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          background: "#0d1117",
          color: "#fff",
          border: "1px solid #30363d",
          resize: "none",
        }}
      ></textarea>

      <button onClick={handleSendMessage}>Enviar</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {queue?.map((msg) => (
          <li
            key={msg.id}
            style={{
              background: "#161b22",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #30363d",
            }}
          >
            <strong style={{ color: "#58a6ff" }}>{msg.userName}</strong>
            <p style={{ margin: "5px 0" }}>{msg.text}</p>
            <small style={{ color: "#aaa" }}>{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
