import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CityGraphPanel from "../components/Graph/CityGraphPanel";
import CityZonesPanel from "../components/Graph/CityZonesPanel";
import { clearError } from "../store/slices/cityNetworkSlice";

export default function CityNetworkPage() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.cityNetwork.error);

  return (
    <section className="page-wrap">
      <div className="page-top-bar">
        <Link to="/" className="back-btn">
          Volver al inicio
        </Link>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button
            type="button"
            className="error-close"
            onClick={() => dispatch(clearError())}
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid-2-cols">
        <CityGraphPanel />
        <CityZonesPanel />
      </div>
    </section>
  );
}
