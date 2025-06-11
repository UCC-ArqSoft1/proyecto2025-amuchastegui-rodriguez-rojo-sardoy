import React from "react";

const ActivityDetail = ({ activity }) => {
  if (!activity) return <p>No se encontró la actividad.</p>;
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 24, margin: '2rem auto', maxWidth: 600 }}>
      <h2>{activity.title}</h2>
      {activity.image && <img src={activity.image} alt={activity.title} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />}
      <p><strong>Descripción:</strong> {activity.description}</p>
      <p><strong>Instructor:</strong> {activity.instructor}</p>
      <p><strong>Horario:</strong> {activity.schedule}</p>
      <p><strong>Duración:</strong> {activity.duration}</p>
      <p><strong>Cupo:</strong> {activity.capacity}</p>
      <p><strong>Categoría:</strong> {activity.category}</p>
    </div>
  );
};

export default ActivityDetail; 