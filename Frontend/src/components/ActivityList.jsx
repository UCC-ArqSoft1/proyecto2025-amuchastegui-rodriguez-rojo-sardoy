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

    {/* Título principal de la sección */}
    <h2 className="activities-title">¡TRANSFORMA TU RUTINA!</h2>

    {/* Si no hay actividades disponibles, muestra un mensaje */}
    {activities.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: 60, color: '#FFD34E', fontWeight: 600, fontSize: 22 }}>
        <div style={{ fontSize: 60, marginBottom: 10 }}>😕</div>
        No se encontraron actividades.<br />
        Probá con otra palabra clave.
      </div>
    ) : (
      // Si hay actividades, se muestran en una grilla con 3 columnas
      <div className="activities-grid activities-grid-3cols" style={{ gap: '2.5rem' }}>
        {activities.map((activity) => {
          // Lógica para asignar un ícono/emoji según el nombre o categoría de la actividad
          let icon = '🏋️‍♂️';
          const name = activity.name?.toLowerCase() || '';
          const category = activity.category?.toLowerCase() || '';
          if (name.includes('yoga')) icon = '🧘';
          else if (name.includes('pilates')) icon = '🧘‍♀️';
          else if (name.includes('spinning') || name.includes('ciclismo')) icon = '🚴';
          else if (name.includes('zumba') || name.includes('baile')) icon = '💃';
          else if (name.includes('crossfit')) icon = '💪';
          else if (name.includes('muscul')) icon = '🏋️‍♂️';
          else if (name.includes('funcional')) icon = '🤸';
          else if (name.includes('boxeo')) icon = '🥊';
          else if (name.includes('natacion')) icon = '🏊';
          else if (name.includes('stretch') || name.includes('elong')) icon = '🤸‍♂️';
          else if (category.includes('mente')) icon = '🧠';

          // Renderiza la tarjeta de actividad
          return (
            <div
              key={activity.id} // Clave única por actividad
              className="activity-card"
              onClick={() => onSelect && onSelect(activity)} // Si hay función onSelect, se llama al hacer clic
            >
              {/* Ícono representativo de la actividad */}
              <div className="activity-icon" style={{ fontSize: 32, color: '#FFD34E', marginBottom: 8 }}>
                <span role="img" aria-label="actividad">{icon}</span>
              </div>

              {/* Nombre de la actividad */}
              <div className="activity-name">{activity.name}</div>

              {/* Día y profesor de la actividad */}
              <div className="activity-info">
                <div className="activity-day" style={{ color: '#fff' }}>{activity.day || activity.date || activity.dia}</div>
                <div className="activity-prof" style={{ color: '#fff' }}>{activity.profesor}</div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </section>
);

export default ActivityList; // Exporta el componente para usarlo en otras partes de la app
