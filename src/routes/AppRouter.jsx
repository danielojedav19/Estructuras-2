import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import GraphPage from "../pages/GraphPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<PrivateRoute><GraphPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
