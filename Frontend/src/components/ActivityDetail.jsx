import React from "react"; // Importa la librería React para poder usar JSX y componentes funcionales

// Componente funcional que recibe una actividad como prop
const ActivityDetail = ({ activity }) => {
  // Si no se recibe ninguna actividad (null o undefined), se muestra un mensaje de error
  if (!activity) return <p>No se encontró la actividad.</p>;

  // Si la actividad existe, se muestra toda su información en una tarjeta estilizada
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 24, margin: '2rem auto', maxWidth: 600 }}>
      {/* Título de la actividad */}
      <h2>{activity.title}</h2>

      {/* Si hay imagen, se muestra con estilos aplicados */}
      {activity.image && <img src={activity.image} alt={activity.title} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />}

      {/* Descripción de la actividad */}
      <p><strong>Descripción:</strong> {activity.description}</p>

      {/* Nombre del instructor */}
      <p><strong>Instructor:</strong> {activity.instructor}</p>

      {/* Horario programado */}
      <p><strong>Horario:</strong> {activity.schedule}</p>

      {/* Duración estimada */}
      <p><strong>Duración:</strong> {activity.duration}</p>

      {/* Cupo máximo permitido */}
      <p><strong>Cupo:</strong> {activity.capacity}</p>

      {/* Categoría a la que pertenece la actividad */}
      <p><strong>Categoría:</strong> {activity.category}</p>
    </div>
  );
};

export default ActivityDetail; // Exporta el componente para ser usado en otros lugares de la aplicación
