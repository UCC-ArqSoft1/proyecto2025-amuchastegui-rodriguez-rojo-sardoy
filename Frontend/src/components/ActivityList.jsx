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
      <div className="activities-grid activities-grid-3cols">
        {activities.map((activity) => (
          <div
            key={activity.actividad_id}
            className="activity-card"
            onClick={() => onSelect && onSelect(activity)}
          >
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