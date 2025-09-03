import { useState } from "react";
import AddCategory from "./AddCategory";

const CategoryApp = () => {
  const [categories, setCategories] = useState([]);

  const onAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <>
      <h1>CategoryApp</h1>

      {/* Componente hijo con el input */}
      <AddCategory onAddCategory={onAddCategory} />

      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </>
  );
};

export default CategoryApp;