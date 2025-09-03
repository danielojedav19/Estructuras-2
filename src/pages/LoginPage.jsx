import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim()); // guarda usuario en contexto
    navigate("/dashboard", { replace: true }); // redirige a dashboard
  };

  if (user) return <p>Ya estás logueado como <b>{user.username}</b>.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login (fake)</h2>
      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
