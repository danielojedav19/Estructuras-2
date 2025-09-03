import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return <h2>Perfil de {user.username}</h2>;
}
