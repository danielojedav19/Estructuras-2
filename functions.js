// functions.js

// Mis Arrays base para pruebas
let myArray = [1, 2, 3];
let myArray2 = [4, 5, 6];


// 1. Arrays Functions para Agregar y eliminar elementos

console.log("\n--- Push ---"); 
myArray.push(4);
console.log(myArray); // Asi debe de quedar el array : [1, 2, 3, 4]

console.log("\n--- Pop ---");
let lastItem = myArray.pop();
console.log("Eliminado:", lastItem); // se elimina el elemento 4
console.log(myArray); // Asi debe de quedar el array : [1, 2, 3]

console.log("\n--- Unshift ---");
myArray.unshift(0);
console.log(myArray); // Asi debe de quedar el array : [0, 1, 2, 3]

console.log("\n--- Shift ---");
let firstItem = myArray.shift();
console.log("Eliminado:", firstItem); // se elimina  0
console.log(myArray); // Asi debe de quedar el array :[1, 2, 3]

console.log("\n--- Splice ---");
myArray.splice(1, 1, 99); // Elimina en índice 1 y agrega 99
console.log(myArray); //Asi debe de quedar el array : [1, 99, 3]

// 2. Buscar y encontrar elementos
console.log("\n--- Find ---");
let found = myArray.find(x => x > 2);
console.log(found); // 99 o 3 dependiendo

console.log("\n--- FindIndex ---");
let idx = myArray.findIndex(x => x === 99);
console.log(idx); // índice

console.log("\n--- FindLast ---");
let lastFound = myArray.findLast(x => x < 3);
console.log(lastFound);

console.log("\n--- FindLastIndex ---");
let lastIdx = myArray.findLastIndex(x => x < 3);
console.log(lastIdx);

console.log("\n--- Includes ---");
console.log(myArray.includes(99)); // true

console.log("\n--- IndexOf ---");
console.log(myArray.indexOf(99));

console.log("\n--- LastIndexOf ---");
console.log(myArray.lastIndexOf(99));

// 3. Combinar y copiar arrays

console.log("\n--- Concat ---");
let myArray3 = myArray.concat(myArray2);
console.log(myArray3);

console.log("\n--- Slice ---");
let sliced = myArray3.slice(2, 5);
console.log(sliced);

console.log("\n--- CopyWithin ---");
let arrCopy = [1, 2, 3, 4, 5];
arrCopy.copyWithin(0, 3);
console.log(arrCopy);

// 4. Iterar y evaluar

console.log("\n--- ForEach ---");
myArray3.forEach(x => console.log("Item:", x));

console.log("\n--- Map ---");
let doubled = myArray3.map(x => x * 2);
console.log(doubled);

console.log("\n--- Filter ---");
let greaterThan3 = myArray3.filter(x => x > 3);
console.log(greaterThan3);

console.log("\n--- Every ---");
console.log(myArray3.every(x => x < 10));

console.log("\n--- Some ---");
console.log(myArray3.some(x => x > 5));

// 5. Reducir valores

console.log("\n--- Reduce ---");
let sum = myArray3.reduce((acc, val) => acc + val, 0);
console.log(sum);

console.log("\n--- ReduceRight ---");
let concatStrings = ["a", "b", "c"].reduceRight((acc, val) => acc + val);
console.log(concatStrings);

// 6. Transformar y ordenar

console.log("\n--- Sort ---");
let nums = [5, 1, 9, 3];
nums.sort((a, b) => a - b);
console.log(nums);

console.log("\n--- Reverse ---");
nums.reverse();
console.log(nums);

console.log("\n--- Flat ---");
let nested = [1, [2, [3, 4]]];
console.log(nested.flat(2));

console.log("\n--- FlatMap ---");
let arrFlatMap = [1, 2, 3];
console.log(arrFlatMap.flatMap(x => [x, x * 2]));

console.log("\n--- Fill ---");
let arrFill = new Array(5).fill(0);
console.log(arrFill);
