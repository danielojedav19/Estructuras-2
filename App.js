import './App.css';
import { useState } from "react";
import ImageForm from "./components/ImageForm";
import ImageList from "./components/ImageList";
import SearchBar from './components/SearchBar';

function App() { // uso de hooks
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");

  // función para añadir imagen 
 const addImage = (id, title) => {
  // Verificar si el ID ya existe (VALIDACION EXTRA JEJE)
  const exists = images.some((img) => img.id === id);
  if (exists) {
    alert(`El ID ${id} ya fue usado. Ingresa otro ID.`);
    return; 
  }

  const newImage = {
    id,
    title,
    url: `https://picsum.photos/id/${id}/200/300`,
  };

  setImages([...images, newImage]); 
};
  // función para actualizar filtro
const handleFilter = (value) => setFilter(value);
  // aplica filtro a la lista de imágenes
  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Galería de Imágenes</h1>

      {/* Formulario para agregar */}
      <ImageForm onAddImage={addImage} />

       {/* barra de busquedas para titulo */}
      <SearchBar onFilter= {handleFilter} />    

      {/* Lista de imágenes filtradas */}
      <ImageList images={filteredImages} />
    </div>
  );
}

export default App;
