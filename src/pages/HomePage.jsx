import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="page-wrap home-page">
      <div className="hero-card">
        <h2>Bienvenido al Parcial 3</h2>
        <p>
          En este aplicativo modelamos una red de ciudades interconectadas y,
          para cada ciudad, un árbol de zonas verdes con subzonas. Podrás
          agregar y eliminar ciudades, conectar la red, gestionar zonas verdes
          y ver la altura máxima y el número total de zonas.
        </p>

        <Link to="/network" className="back-btn hero-btn">
          Ir al aplicativo 
        </Link>
      </div>
    </section>
  );
}
