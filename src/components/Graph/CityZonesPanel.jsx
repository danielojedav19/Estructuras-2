import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addZone, editZone } from "../../store/slices/cityNetworkSlice";

// helpers
function countZones(nodes) {
  let total = 0;
  const stack = [...nodes];
  while (stack.length > 0) {
    const node = stack.pop();
    total += 1;
    if (node.children?.length) {
      for (const child of node.children) stack.push(child);
    }
  }
  return total;
}

function heightOfZones(nodes) {
  if (!nodes || nodes.length === 0) return 0;

  const dfs = (node) => {
    if (!node.children || node.children.length === 0) return 1;
    let maxChild = 0;
    for (const child of node.children) {
      const h = dfs(child);
      if (h > maxChild) maxChild = h;
    }
    return 1 + maxChild;
  };

  let globalMax = 0;
  for (const root of nodes) {
    const h = dfs(root);
    if (h > globalMax) globalMax = h;
  }
  return globalMax;
}

function flattenZones(nodes, depth = 0, acc = []) {
  for (const node of nodes) {
    acc.push({ id: node.id, name: node.name, depth });
    if (node.children?.length) {
      flattenZones(node.children, depth + 1, acc);
    }
  }
  return acc;
}

export default function CityZonesPanel() {
  const dispatch = useDispatch();
  const { cities, selectedCityId } = useSelector((state) => state.cityNetwork);

  const selectedCity = useMemo(
    () => cities.find((c) => c.id === selectedCityId) || null,
    [cities, selectedCityId]
  );

  const [zoneName, setZoneName] = useState("");
  const [parentId, setParentId] = useState("");
  const [editZoneId, setEditZoneId] = useState("");
  const [newZoneName, setNewZoneName] = useState("");

  if (!selectedCity) {
    return (
      <div className="dashboard-card">
        <h2 className="card-title">Zonas Verdes</h2>
        <p>Selecciona una ciudad para gestionar sus zonas verdes.</p>
      </div>
    );
  }

  const zones = selectedCity.zones;
  const flatZones = flattenZones(zones);
  const totalZones = countZones(zones);
  const maxHeight = heightOfZones(zones);

  const handleAddZone = (e) => {
    e.preventDefault();
    dispatch(
      addZone({
        cityId: selectedCity.id,
        name: zoneName,
        parentId: parentId || null,
      })
    );
    setZoneName("");
    setParentId("");
  };

  const handleEditZone = (e) => {
    e.preventDefault();
    dispatch(
      editZone({
        cityId: selectedCity.id,
        zoneId: editZoneId,
        newName: newZoneName,
      })
    );
    setNewZoneName("");
  };

  const renderTree = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return null;
    return (
      <ul className="tree-list">
        {nodes.map((node) => (
          <li key={node.id} style={{ paddingLeft: depth * 18 }}>
            <span className="tree-node-label">
              <span className="tree-node-id">#{node.id}</span>
              <span>{node.name}</span>
            </span>
            {renderTree(node.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard-card">
      <h2 className="card-title">
        Zonas Verdes – <span className="highlight">{selectedCity.name}</span>
      </h2>

      <div className="feature-grid">
        {/* Card 1: Métricas */}
        <div className="feature-card">
          <h3 className="card-subtitle">Métricas de la ciudad</h3>
          <div className="metrics-row">
            <div className="metric-card">
              <span className="metric-label">Total de zonas verdes</span>
              <span className="metric-value">{totalZones}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Altura máxima del árbol</span>
              <span className="metric-value">{maxHeight}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Agregar zona */}
        <div className="feature-card">
          <h3 className="card-subtitle">Agregar zona verde</h3>
          <form className="form-column" onSubmit={handleAddZone}>
            <input
              type="text"
              className="input"
              placeholder="Nombre de la zona"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
            />

            <select
              className="input"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">Sin padre (nivel raíz)</option>
              {flatZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {"— ".repeat(z.depth)}
                  {z.name} (#{z.id})
                </option>
              ))}
            </select>

            <button type="submit" className="btn">
              Agregar zona
            </button>
          </form>
        </div>

        {/* Card 3: Editar zona */}
        <div className="feature-card">
          <h3 className="card-subtitle">Editar nombre de zona</h3>
          <form className="form-column" onSubmit={handleEditZone}>
            <select
              className="input"
              value={editZoneId}
              onChange={(e) => setEditZoneId(e.target.value)}
            >
              <option value="">Selecciona una zona...</option>
              {flatZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {"— ".repeat(z.depth)}
                  {z.name} (#{z.id})
                </option>
              ))}
            </select>

            <input
              type="text"
              className="input"
              placeholder="Nuevo nombre"
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
            />

            <button type="submit" className="btn btn-outline">
              Guardar cambio
            </button>
          </form>
        </div>

        {/* Card 4: Árbol */}
        <div className="feature-card">
          <h3 className="card-subtitle">Árbol de zonas verdes</h3>
          {zones.length === 0 ? (
            <p>La ciudad aún no tiene zonas verdes registradas.</p>
          ) : (
            renderTree(zones)
          )}
        </div>
      </div>
    </div>
  );
}
