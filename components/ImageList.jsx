export default function ImageList({ images }) {
  if (images.length === 0) {
    return <p>No hay imágenes para mostrar.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}/*para que las imágenes se acomoden en filas y columnas */> 
      {images.map((img) => ( /* por cada objeto genero un bloque*/
        <div key={img.id} style={{ textAlign: "center" }}>
          <img src={img.url} alt={img.title} />
          <p>{img.title}</p>
        </div>
      ))}
    </div>
  );
}
