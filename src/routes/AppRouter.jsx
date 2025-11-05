import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { makeMenuTree, flattenRoutes } from "./menuTree";

export const AppRouter = () => {
  const tree = makeMenuTree();
  const flat = flattenRoutes(tree);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout tree={tree} />}>
          {/* Redirige raíz a 'Profile' */}
          <Route index element={<Navigate to="/profile" replace />} />

          {/* Generadas desde el árbol */}
          {flat.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
