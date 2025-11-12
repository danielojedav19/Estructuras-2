import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Graph } from "react-d3-graph";

export default function GraphVisualizer() {
  const { cities, persons, friends } = useSelector((s) => s.graph);

  // ---- medir ancho del contenedor para no forzar reinit del zoom ----
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 900, h: 500 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(600, Math.floor(r.width) - 20), h: 500 });
    };
    update();

    // resize observer estable
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- data: memo estable ----
  const data = useMemo(() => {
    const nodes = [
      ...cities.map((c) => ({ id: c.id, label: c.name, symbolType: "diamond", color: "#eab308" })),
      ...persons.map((p) => ({ id: p.id, label: `${p.name} (${p.age})`, symbolType: "circle", color: "#5b86e5" })),
    ];
    const links = [];
    persons.forEach((p) => { if (p.cityId) links.push({ source: p.id, target: p.cityId, label: "lives in" }); });
    friends.forEach((f) => links.push({ source: f.a, target: f.b, label: "friend" }));
    return { nodes, links };
  }, [cities, persons, friends]);

  // ---- config: referencia fija (no cambia entre renders) ----
  const config = useMemo(() => ({
    directed: false,
    panAndZoom: true,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    d3: { gravity: -250, linkLength: 150 },
    node: {
      size: 500,
      fontColor: "#e5e7eb",
      highlightColor: "#a8c5ff",
      renderLabel: true,
      labelProperty: "label",
    },
    link: {
      color: "#8a9bb8",
      highlightColor: "#ffffff",
      renderLabel: true,
      labelProperty: "label",
    },
    backgroundColor: "#0d1117",
  }), []);

  // Fallback sin romper el orden de hooks
  const noData = (
    <div style={{height:"100%",display:"grid",placeItems:"center",color:"#9ca3af",fontStyle:"italic"}}>
      Agrega una ciudad y una persona para ver el grafo.
    </div>
  );

  return (
    <div ref={wrapRef} className="graph-wrapper">
      {data.nodes.length === 0 ? (
        noData
      ) : (
        // width/height vienen del contenedor -> no re-inicializa zoom
        <Graph id="graph-16"
               data={data}
               config={{ ...config, width: size.w, height: size.h }} />
      )}
    </div>
  );
}
