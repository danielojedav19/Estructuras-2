import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Layout = ({ tree }) => {
  return (
    <div className="app-shell">
      <Sidebar tree={tree} />
      <main className="app-main">
        <Outlet />
        <footer className="layout-footer">Hecho por Daniel Ojeda</footer>
      </main>
    </div>
  );
};
