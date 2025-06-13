import React from "react"; // Importa React para poder usar JSX y componentes funcionales

// Componente funcional de barra de búsqueda
const SearchBar = ({ search, setSearch }) => (
  <input
    type="text" // Campo de entrada de texto
    placeholder="Buscar por palabra clave, dia o categoría..." // Texto gris que aparece cuando está vacío
    value={search} // El valor del input se vincula con la variable 'search' (estado controlado)
    onChange={e => setSearch(e.target.value)} // Cada vez que el usuario escribe, actualiza el estado 'search'

    // Estilos inline: diseño moderno y oscuro
    style={{
      width: '100%',                    // Ocupa todo el ancho del contenedor
      maxWidth: 400,                    // Ancho máximo limitado a 400px
      padding: '0.35rem 0.7rem',        // Espaciado interno
      marginBottom: 0,                 // Sin margen inferior
      borderRadius: '7px',              // Bordes redondeados
      border: '1px solid #222',         // Borde sutil
      fontSize: 13,                     // Tamaño de fuente pequeño
      background: '#232323',            // Fondo oscuro
      color: '#fff',                    // Texto blanco
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)' // Sombra ligera para dar profundidad
    }}
  />
);

export default SearchBar; // Exporta el componente para poder usarlo en otras partes de la app
