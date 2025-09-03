import React from "react";

// React.memo asegura que solo se renderiza si cambian sus props
const ShowNumber = React.memo(({ number, onClick }) => {
  console.log(`Renderizando botón ${number}`);

  return <button onClick={() => onClick(number)}>Número {number}</button>;
});

export default ShowNumber;
