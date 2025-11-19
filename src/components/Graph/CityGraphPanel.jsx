import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCity,
  deleteCity,
  selectCity,
  connectCities,
} from "../../store/slices/cityNetworkSlice";
import { Graph } from "react-d3-graph";

export default function CityGraphPanel() {
  const dispatch = useDispatch();
  const { cities, adjacency, selectedCityId } = useSelector(
    (state) => state.cityNetwork
  );

  const [cityName, setCityName] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const idToName = useMemo(
    () => new Map(cities.map((c) => [c.id, c.name])),
    [cities]
  );
  const nameToId = useMemo(
    () => new Map(cities.map((c) => [c.name, c.id])),
    [cities]
  );

  // Datos para react-d3-graph
  const graphData = useMemo(() => {
    const nodes = cities.map((c) => ({ id: c.name }));

    const links = [];
    Object.keys(adjacency).forEach((fromId) => {
      const fromName = idToName.get(fromId);
      if (!fromName) return;

      (adjacency[fromId] || []).forEach((toId) => {
        const toName = idToName.get(toId);
        if (!toName) return;
        // evitar duplicados
        if (fromId < toId) {
          links.push({ source: fromName, target: toName });
        }
      });
    });

    return { nodes, links };
  }, [cities, adjacency, idToName]);

  const graphConfig = {
    directed: false,
    width: 400,
    height: 230,
    nodeHighlightBehavior: true,
    node: {
      color: "#38bdf8",
      size: 400,
      labelProperty: "id",
      fontColor: "#e5e7eb",
      highlightColor: "#0ea5e9",
    },
    link: {
      color: "#64748b",
      highlightColor: "#0ea5e9",
    },
    panAndZoom: true,
  };

  const handleClickNode = (nodeId) => {
    const cityId = nameToId.get(nodeId);
    if (cityId) {
      dispatch(selectCity(cityId));
    }
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    dispatch(addCity(cityName));
    setCityName("");
  };

  const handleDeleteCity = (id) => {
    dispatch(deleteCity(id));
  };

  const handleConnect = (e) => {
    e.preventDefault();
    dispatch(connectCities({ fromId: fromCity, toId: toCity }));
  };

  const adjacencyLines = Object.keys(adjacency).map((cityId) => {
    const name = idToName.get(cityId) || cityId;
    const neighbors = adjacency[cityId] || [];
    const neighborsNames =
      neighbors.length === 0
        ? "∅"
        : neighbors.map((id) => idToName.get(id) || id).join(", ");
    return `${name} -> [ ${neighborsNames} ]`;
  });

  return (
    <div className="dashboard-card">
      <h2 className="card-title">Red de Ciudades (Grafo)</h2>

      <div className="feature-grid">
        {/* Card 1: Grafo visual */}
        <div className="feature-card">
          <h3 className="card-subtitle">Visualización del grafo</h3>
          <div className="graph-wrapper">
            {graphData.nodes.length === 0 ? (
              <div className="graph-empty">
                Agrega al menos una ciudad para ver el grafo.
              </div>
            ) : (
              <Graph
                id="cities-graph"
                data={graphData}
                config={graphConfig}
                onClickNode={handleClickNode}
              />
            )}
          </div>
          <p className="hint-text">
            Haz clic sobre un nodo para seleccionar la ciudad.
          </p>
        </div>

        {/* Card 2: Gestión de ciudades */}
        <div className="feature-card">
          <h3 className="card-subtitle">Ciudades</h3>
          <form className="form-row" onSubmit={handleAddCity}>
            <input
              type="text"
              className="input"
              placeholder="Nombre de la ciudad"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button type="submit" className="btn">
              Agregar
            </button>
          </form>

          <ul className="city-list">
            {cities.map((city) => (
              <li
                key={city.id}
                className={
                  city.id === selectedCityId
                    ? "city-item city-item-active"
                    : "city-item"
                }
              >
                <span>{city.name}</span>
                <div className="city-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(selectCity(city.id))}
                  >
                    Seleccionar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteCity(city.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
            {cities.length === 0 && (
              <li className="city-item city-item-empty">
                Añade una ciudad para empezar.
              </li>
            )}
          </ul>
        </div>

        {/* Card 3: Conexiones + lista de adyacencia */}
        <div className="feature-card">
          <h3 className="card-subtitle">Conexiones</h3>
          <form className="form-row" onSubmit={handleConnect}>
            <select
              className="input"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Ciudad origen</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              <option value="">Ciudad destino</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-outline">
              Conectar
            </button>
          </form>

          <h4 className="card-subtitle">Lista de adyacencia</h4>
          <pre className="adjacency-box">
            {adjacencyLines.length === 0
              ? "No hay conexiones aún."
              : adjacencyLines.join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
}
