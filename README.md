## Descripcion del reto  
**Challenge 15 – Árbol de Categorías (n niveles)**  
Implementación en React de un árbol expandible para categorías y subcategorías infinitas.

**¿Qué hace?**  
- Crea categorías en raíz y como hijas de cualquier nodo.  
- Permite **expandir/contraer** cada nodo o **todo el árbol**.  
- **Renombrar** y **eliminar** nodos (con sus hijos).  
- Muestra **breadcrumb** del nodo seleccionado.  
- Tema **dark** y tipografía **serif** (clases: `dashboard-card`, `back-btn`, etc.).  
- Navegación con **/** (Home) y **/categories** (árbol).  
- Maneja árbol vacío sin errores.
- Footer: “Hecho por Daniel Ojeda”.

## Tecnologias
React (JS), react-router-dom  
*(Opcional: Firebase Firestore si deseas persistencia en tiempo real; si no, memoria/localStorage).*

## Photo
<img width="1193" height="604" alt="Captura de pantalla 2025-11-05 140105" src="https://github.com/user-attachments/assets/8fdfc64a-5539-4ff8-9fd9-5d4227eded4f" />

## Como ejecutar
```bash
npm install
npm install react-router-dom
# (Opcional si usarás Firestore)
# npm install firebase
npm start

