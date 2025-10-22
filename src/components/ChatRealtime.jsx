import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ChatRealtime = () => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messageList = data ? Object.values(data) : [];
      setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
    });
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const db = getDatabase();
    const messagesRef = ref(db, "messages");

    await push(messagesRef, {
      user: user?.displayName || "Anónimo",
      text: message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className="chat-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Volver al Dashboard
      </button>

      <div className="chat-card">
        <h2 className="chat-title"> Chat en Tiempo Real</h2>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.user === user?.displayName ? "own" : ""
              }`}
            >
              <strong>{msg.user}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};
