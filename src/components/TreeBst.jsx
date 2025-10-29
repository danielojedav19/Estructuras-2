import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tree from "react-d3-tree";
import { BinarySearchTree } from "../ds/BinaryTree";

const DEFAULT_SERIES = "8,3,10,1,6,14,4,7,13";

export const TreeBst = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState(DEFAULT_SERIES);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const bst = useMemo(() => {
    const parts = series.split(",").map((s) => s.trim()).filter(Boolean);
    return BinarySearchTree.fromArray(parts);
  }, [series]);

  const data = useMemo(() => bst.toD3(), [bst]);
  const hasTree = data.length > 0;

  // Recorridos (auto-actualizados)
  const traversals = useMemo(() => {
    const ino = [], pre = [], post = [];
    bst.traverseInOrder((v) => ino.push(v));
    bst.traversePreOrder((v) => pre.push(v));
    bst.traversePostOrder((v) => post.push(v));
    return { ino, pre, post };
  }, [bst]);

  const printTraversals = () => {
    console.clear();
    console.log("InOrder (L-N-R):", traversals.ino.join(", "));
    console.log("PreOrder (N-L-R):", traversals.pre.join(", "));
    console.log("PostOrder (L-R-N):", traversals.post.join(", "));
    alert("Recorridos impresos en consola");
  };

  // Búsqueda
  const found = query.trim() === "" || !hasTree ? null : bst.contains(query.trim());

  // Centrar el árbol al montar/redimensionar
  const [translate, setTranslate] = useState({ x: 320, y: 80 });
  useEffect(() => {
    if (!wrapperRef.current) return;
    const b = wrapperRef.current.getBoundingClientRect();
    setTranslate({ x: b.width / 2, y: 80 });
  }, [wrapperRef, data]);

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <>
      <div className="tree-container">
        <button className="back-btn" onClick={goBack}>
          ← Volver
        </button>

        <div className="dashboard-card tree-card">
          <h2 className="card-title">Árbol Binario (BST)</h2>

          <div className="tree-controls">
            <input
              type="text"
              placeholder="Serie separada por comas, ej: 8,3,10,1,6,14,4,7,13"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
            />

            <div className="tree-actions">
              <button onClick={printTraversals}>Imprimir recorridos</button>
              <button onClick={() => setSeries(DEFAULT_SERIES)}>Restablecer</button>
            </div>

            <div className="tree-search">
              <input
                type="text"
                placeholder="Buscar valor…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {found !== null && (
                <span className={`tree-badge ${found ? "ok" : "ko"}`}>
                  {found ? "Encontrado" : "No encontrado"}
                </span>
              )}
            </div>
          </div>

          <div className="tree-viz" ref={wrapperRef}>
            <div className="tree-wrapper">
              {hasTree ? (
                <Tree
                  data={data}
                  orientation="vertical"
                  pathFunc="elbow"
                  separation={{ siblings: 1.0, nonSiblings: 1.2 }}
                  translate={translate}
                  zoom={0.8}
                  collapsible={false}
                />
              ) : (
                <div className="tree-empty">Árbol vacío. Agrega valores en la serie.</div>
              )}
            </div>
          </div>

          <div className="tree-traversals">
            <div className="trav-card">
              <h3 className="trav-title">InOrder (L-N-R)</h3>
              <div className="trav-list">
                {traversals.ino.map((v, i) => (
                  <span key={`ino-${i}`} className="chip">{v}</span>
                ))}
              </div>
            </div>

            <div className="trav-card">
              <h3 className="trav-title">PreOrder (N-L-R)</h3>
              <div className="trav-list">
                {traversals.pre.map((v, i) => (
                  <span key={`pre-${i}`} className="chip">{v}</span>
                ))}
              </div>
            </div>

            <div className="trav-card">
              <h3 className="trav-title">PostOrder (L-R-N)</h3>
              <div className="trav-list">
                {traversals.post.map((v, i) => (
                  <span key={`post-${i}`} className="chip">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="layout-footer">Hecho por Daniel Ojeda</footer>
    </>
  );
};
