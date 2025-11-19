import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CityNetworkPage from "../pages/CityNetworkPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/network" element={<CityNetworkPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
