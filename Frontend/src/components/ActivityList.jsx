import React from "react";

const ActivityList = ({ activities, onSelect }) => (
  <div>
    {activities.length === 0 ? (
      <p>No hay actividades para mostrar.</p>
    ) : (
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} onClick={() => onSelect(activity)} style={{ cursor: 'pointer', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <strong>{activity.title}</strong><br />
            Horario: {activity.schedule}<br />
            Profesor: {activity.instructor}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ActivityList; 