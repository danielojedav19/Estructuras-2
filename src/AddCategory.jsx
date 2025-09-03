import { useState } from "react";
import PropTypes from "prop-types";

const AddCategory = ({ onAddCategory }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => setInputValue(e.target.value);

  const onSubmit = () => {
    if (inputValue.trim().length === 0) return;
    onAddCategory(inputValue.trim());
    setInputValue(""); // limpiar input
  };

  return (
    <>
      <input
        type="text"
        placeholder="Escribe una categoría"
        value={inputValue}
        onChange={onInputChange}
      />
      <button onClick={onSubmit}>Agregar</button>
    </>
  );
};

AddCategory.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
};

export default AddCategory;
