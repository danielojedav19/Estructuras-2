import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/Login";
import { Registro } from "../components/Registro";
import { Dashboard } from "../components/Dashboard";
import { Layout } from "../layout/Layout"; 
import { PrivateRoute } from "./PrivateRoute";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const { user } = useSelector((state) => state.auth); // auth.user

  return (
    <Router>
      <Routes>
        {/* Envolvemos todas las rutas con Layout */}
        <Route path="/" element={<Layout />}>
          {/* Página principal: Login */}
          <Route
            index
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />

          {/* Registro */}
          <Route
            path="register"
            element={!user ? <Registro /> : <Navigate to="/dashboard" />}
          />

          {/* Dashboard protegido */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirección para rutas no válidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};