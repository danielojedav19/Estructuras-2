import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="page">
      <h2>Dashboard (Ruta privada)</h2>
      <p>Bienvenido, <b>{user.username}</b> 👋</p>
    </div>
  );
}
