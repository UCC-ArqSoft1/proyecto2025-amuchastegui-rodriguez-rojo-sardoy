import React from "react";
import '../styles/activities.css';

export const activityData = [
  {
    actividad_id: 1,
    nombre: "Yoga",
    cupo: 20,
    dia: "Lunes y Miércoles",
    profesor: "María López",
    duracion: 60,
    categoria: "Cuerpo y mente",
    icon: (
      // Silueta inspirada en Qivox (posición de loto)
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M12 6.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-6.5 13c0 .55.45 1 1 1h11a1 1 0 0 0 1-1c0-1.1-.9-2-2-2H7.5c-1.1 0-2 .9-2 2Zm6.5-10.5c-1.1 0-2 .9-2 2v2.25c0 .41.34.75.75.75s.75-.34.75-.75V11c0-.14.11-.25.25-.25s.25.11.25.25v2.25c0 .41.34.75.75.75s.75-.34.75-.75V11c0-1.1-.9-2-2-2Zm-4.25 4.5c-.41 0-.75.34-.75.75v2.25c0 .41.34.75.75.75s.75-.34.75-.75V15c0-.41-.34-.75-.75-.75Zm8.5 0c-.41 0-.75.34-.75.75v2.25c0 .41.34.75.75.75s.75-.34.75-.75V15c0-.41-.34-.75-.75-.75Z" fill="#FFD34E" /></svg>
    ),
  },
  {
    actividad_id: 2,
    nombre: "Pilates",
    cupo: 15,
    dia: "Martes y Jueves",
    profesor: "Ana Torres",
    duracion: 50,
    categoria: "Cuerpo y mente",
    icon: (
      // Camilla/reformer estilizada
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 64 64" fill="none"><rect x="8" y="44" width="48" height="8" rx="4" fill="#FFD34E" /><rect x="40" y="28" width="12" height="4" rx="2" fill="#FFD34E" /><rect x="12" y="36" width="8" height="8" rx="4" fill="#FFD34E" /><rect x="44" y="36" width="8" height="8" rx="4" fill="#FFD34E" /><rect x="28" y="20" width="8" height="16" rx="4" fill="#FFD34E" /></svg>
    ),
  },
  {
    actividad_id: 3,
    nombre: "Zumba",
    cupo: 30,
    dia: "Viernes",
    profesor: "Carlos Pérez",
    duracion: 45,
    categoria: "Cardio",
    icon: (
      // Figura bailando
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="16" r="8" fill="#FFD34E" /><path d="M24 32c-6 0-8 8-8 12h8v8h8v-8h8c0-4-2-12-8-12Z" fill="#FFD34E" /><path d="M44 44c2 0 4 2 4 4s-2 4-4 4" stroke="#FFD34E" strokeWidth="2" fill="none" /></svg>
    ),
  },
  {
    actividad_id: 4,
    nombre: "Funcional",
    cupo: 25,
    dia: "Lunes, Miércoles y Viernes",
    profesor: "Lucía Gómez",
    duracion: 55,
    categoria: "Fuerza",
    icon: (
      // Sentadilla con barra
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 64 64" fill="none"><rect x="10" y="36" width="44" height="8" rx="4" fill="#FFD34E" /><rect x="14" y="28" width="8" height="8" rx="4" fill="#FFD34E" /><rect x="42" y="28" width="8" height="8" rx="4" fill="#FFD34E" /><rect x="28" y="16" width="8" height="20" rx="4" fill="#FFD34E" /><circle cx="32" cy="12" r="6" fill="#FFD34E" /></svg>
    ),
  },
  {
    actividad_id: 5,
    nombre: "Spinning",
    cupo: 18,
    dia: "Martes y Jueves",
    profesor: "Sofía Ruiz",
    duracion: 40,
    categoria: "Cardio",
    icon: (
      // Bicicleta de spinning
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 64 64" fill="none"><circle cx="20" cy="48" r="8" fill="#FFD34E" /><circle cx="44" cy="48" r="8" fill="#FFD34E" /><rect x="28" y="20" width="8" height="20" rx="4" fill="#FFD34E" /><rect x="24" y="16" width="16" height="6" rx="3" fill="#FFD34E" /></svg>
    ),
  },
  {
    actividad_id: 6,
    nombre: "Musculación",
    cupo: 35,
    dia: "Todos los días",
    profesor: "Juan Fernández",
    duracion: 90,
    categoria: "Fuerza",
    icon: (
      // Mancuerna/levantamiento de pesas
      <svg className="activity-svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M20.57 14.86l-1.43-1.43 1.43-1.43c.39-.39.39-1.02 0-1.41l-1.41-1.41c-.39-.39-1.02-.39-1.41 0l-1.43 1.43-1.43-1.43c-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41l1.43 1.43-1.43 1.43c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l1.43-1.43 1.43 1.43c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41z" fill="#FFD34E" /></svg>
    ),
  },
];

const ActivityList = ({ onSelect, showLogo = true, activities = activityData }) => (
  <section className="activities-section activities-fullscreen">
    {showLogo && (
      <div className="activities-header">
        <span className="activities-logo">FORMA NOVA</span>
      </div>
    )}
    <h2 className="activities-title">¡TRANSFORMA TU RUTINA!</h2>
    {activities.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: 60, color: '#FFD34E', fontWeight: 600, fontSize: 22 }}>
        <div style={{ fontSize: 60, marginBottom: 10 }}>😕</div>
        No se encontraron actividades.<br />
        Probá con otra palabra clave.
      </div>
    ) : (
      <div className="activities-grid activities-grid-3cols">
        {activities.map((activity) => (
          <div
            key={activity.actividad_id}
            className="activity-card"
            onClick={() => onSelect && onSelect(activity)}
          >
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-name">{activity.nombre}</div>
            <div className="activity-info">
              <div className="activity-day">{activity.dia}</div>
              <div className="activity-prof">{activity.profesor}</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default ActivityList; 