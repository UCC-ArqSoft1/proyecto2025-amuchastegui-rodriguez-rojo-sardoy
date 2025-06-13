import React from "react";
import '../styles/activities.css';

const ActivityList = ({ onSelect, showLogo = true, activities = [] }) => (
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
      <div className="activities-grid activities-grid-3cols" style={{ gap: '2.5rem' }}>
        {activities.map((activity) => {
          // Elegir emoji según el nombre o categoría
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

          return (
            <div
              key={activity.id}
              className="activity-card"
              onClick={() => onSelect && onSelect(activity)}
            >
              <div className="activity-icon" style={{ fontSize: 32, color: '#FFD34E', marginBottom: 8 }}>
                <span role="img" aria-label="actividad">{icon}</span>
              </div>
              <div className="activity-name">{activity.name}</div>
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

export default ActivityList; 