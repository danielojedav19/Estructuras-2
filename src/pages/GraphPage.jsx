import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GraphVisualizer from "../components/Graph/GraphVisualizer";
import CityForm from "../components/Graph/CityForm";
import PersonForm from "../components/Graph/PersonForm";
import FriendForm from "../components/Graph/FriendForm";
import CityPeopleList from "../components/Graph/CityPeopleList";
import { hydrateGraph } from "../store/thunks/graphThunks";

export default function GraphPage() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(hydrateGraph()); }, [dispatch]);

  return (
    <div className="graph-container">
      <div className="dashboard-card graph-card">
        <h2 className="card-title">Visualización del Grafo</h2>
        <div className="graph-viz">
          <div className="graph-wrapper">
            <GraphVisualizer />
          </div>
        </div>
      </div>

      <div className="dashboard-card graph-card">
        <div className="grid">
          <div>
            <h3 style={{marginTop:0}}>Agregar Ciudad</h3>
            <CityForm />
            <div className="sep" />
            <h3>Agregar Persona</h3>
            <PersonForm />
          </div>
          <div>
            <h3 style={{marginTop:0}}>Agregar Amistad</h3>
            <FriendForm />
            <div className="sep" />
            <h3>Personas por Ciudad</h3>
            <CityPeopleList />
          </div>
        </div>
      </div>
    </div>
  );
}
