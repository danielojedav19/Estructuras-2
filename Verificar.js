// Función regular
function verificarParImpar(numero) {
  if (numero % 2 === 0) {
    console.log(`${numero} es par`);
  } else {
    console.log(`${numero} es impar`);
  }
}

// Función flecha (arrow function)
const verificarParImparFlecha = (numero) => {
  if (numero % 2 === 0) {
    console.log(`${numero} es par`);
  } else {
    console.log(`${numero} es impar`);
  }
};

// Ejemplos de uso:
verificarParImpar(10);        // 10 es par
verificarParImpar(7);         // 7 es impar
verificarParImparFlecha(4);   // 4 es par
verificarParImparFlecha(13);  // 13 es impar
