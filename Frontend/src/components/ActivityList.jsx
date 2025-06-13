import React from "react"; // Importa React para usar JSX
import '../styles/activities.css'; // Importa estilos personalizados para el componente

// Componente funcional que muestra una lista de actividades
const ActivityList = ({ onSelect, showLogo = true, activities = [] }) => (
  <section className="activities-section activities-fullscreen">
    {/* Si showLogo es true, muestra el nombre del gimnasio */}
    {showLogo && (
      <div className="activities-header">
        <span className="activities-logo">FORMA NOVA</span>
      </div>
    )}

    {/* Si no hay actividades disponibles, muestra un mensaje */}
    {activities.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: 60, color: '#FFD34E', fontWeight: 600, fontSize: 22 }}>
        No se encontraron actividades.<br />
        Probá con otra palabra clave.
      </div>
    ) : (
      // Si hay actividades, se muestran en una grilla con 3 columnas
      <div className="activities-grid activities-grid-3cols">
        {activities.map((activity) => {
          // Renderiza la tarjeta de actividad
          return (
            <div
              key={activity.id} // Clave única por actividad
              className="activity-card"
              onClick={() => onSelect && onSelect(activity)} // Si hay función onSelect, se llama al hacer clic
            >
              {/* Nombre de la actividad */}
              <div className="activity-name">{activity.name}</div>

              {/* Día y profesor de la actividad */}
              <div className="activity-info">
                <div className="activity-day">{activity.day || activity.date || activity.dia}</div>
                <div className="activity-prof">{activity.profesor}</div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </section>
);

export default ActivityList; // Exporta el componente para usarlo en otras partes de la app
