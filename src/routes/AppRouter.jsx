import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../layout/Layout";
import { Login } from "../components/Login";
import { Registro } from "../components/Registro";
import { Dashboard } from "../components/Dashboard";
import { Crud } from "../components/Crud";
import { ChatRealtime } from "../components/ChatRealtime";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { user } = useSelector((state) => state.auth); // auth.user

  return (
    <Router>
      <Routes>
        {/* Layout principal que envuelve todo */}
        <Route path="/" element={<Layout />}>
          {/* Página principal → Login */}
          <Route
            index
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />

          {/* Registro */}
          <Route
            path="register"
            element={!user ? <Registro /> : <Navigate to="/dashboard" />}
          />

          {/* Dashboard (protegido) */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* CRUD (protegido) */}
          <Route
            path="crud"
            element={
              <PrivateRoute>
                <Crud />
              </PrivateRoute>
            }
          />

          {/* CHAT EN TIEMPO REAL (protegido) */}
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <ChatRealtime />
              </PrivateRoute>
            }
          />

          {/* Rutas no válidas → redirigir */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
