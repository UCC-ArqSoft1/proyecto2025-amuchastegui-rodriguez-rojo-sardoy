import React from "react"; // Importa React para poder usar JSX
import { useNavigate } from "react-router-dom"; // Hook para redirigir a otra ruta

// Componente funcional que renderiza un botón de cierre de sesión
const LogoutButton = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente entre rutas

  // Función que se ejecuta al hacer clic en "Cerrar sesión"
  const handleLogout = () => {
    localStorage.removeItem('token');     // Elimina el token JWT guardado
    localStorage.removeItem('userName');  // Elimina el nombre del usuario
    localStorage.removeItem('userId');    // Elimina el ID del usuario
    localStorage.removeItem('role');      // Elimina el rol del usuario

    navigate('/login'); // Redirige al usuario a la pantalla de login
  };

  // Renderiza el botón con un margen a la izquierda
  return (
    <button onClick={handleLogout} style={{ marginLeft: 16 }}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton; // Exporta el componente para su uso en otras partes de la app
