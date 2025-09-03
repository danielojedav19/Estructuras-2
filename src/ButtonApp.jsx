import { useState, useCallback } from "react";
import ShowNumber from "./ShowNumber";

const ButtonApp = () => {
  const [numero, setNumero] = useState(0);

  // useCallback memoriza la función y evita que cambie en cada render
  const handleClick = useCallback((n) => {
    setNumero(n);
  }, []); //  dependencias vacías

  return (
    <>
      <h1>Challenge 05</h1>
      <h2>Numero actual: {numero}</h2>

      <ShowNumber number={1} onClick={handleClick} />
      <ShowNumber number={2} onClick={handleClick} />
      <ShowNumber number={3} onClick={handleClick} />
    </>
  );
};

export default ButtonApp;
