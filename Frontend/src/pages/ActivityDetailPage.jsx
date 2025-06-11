import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activityData } from "../components/ActivityList";
import "../styles/activity-detail.css";

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos la carga de datos
    const fetchActivity = async () => {
      try {
        // En producción, esto sería una llamada real a la API
        const foundActivity = activityData.find(a => a.actividad_id === parseInt(id));
        if (foundActivity) {
          setActivity(foundActivity);
        } else {
          setError("Actividad no encontrada");
        }
      } catch (err) {
        setError("Error al cargar la actividad");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleInscription = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Aquí iría la llamada real a la API
      console.log("Inscribiendo a la actividad:", activity.actividad_id);
      alert("¡Inscripción exitosa!");
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("Error al inscribirse en la actividad");
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!activity) return <div className="error">Actividad no encontrada</div>;

  return (
    <div className="activity-detail-bg">
      <div className="activity-detail-card" style={{ position: 'relative', maxWidth: 340, margin: '0 auto', padding: '1.2rem 1rem 1.2rem 1rem' }}>
        <button
          className="activity-detail-btn"
          style={{ position: 'absolute', top: 12, right: 12, width: 70, padding: '0.4rem 0.5rem', fontSize: 12 }}
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
        <div className="activity-detail-header">
          <h1 className="activity-detail-title" style={{ fontSize: 22 }}>{activity.nombre}</h1>
        </div>
        <div className="activity-detail-image" style={{ width: '90%', margin: '0 auto 0.7rem auto', display: 'flex', justifyContent: 'center' }}>
          <img
            src={activity.imageUrl || "https://via.placeholder.com/300x120?text=Actividad"}
            alt={activity.nombre}
            style={{ width: '100%', maxWidth: 180, maxHeight: 90, objectFit: 'cover', borderRadius: 10, background: '#222', display: 'block' }}
          />
        </div>
        <div className="activity-detail-info" style={{ fontSize: 15 }}>
          <div className="info-section">
            <h3 style={{ fontSize: 16 }}>Información General</h3>
            <p><span className="activity-detail-label">Día:</span> {activity.dia}</p>
            <p><span className="activity-detail-label">Profesor:</span> {activity.profesor}</p>
            <p><span className="activity-detail-label">Duración:</span> {activity.duracion}</p>
            <p><span className="activity-detail-label">Categoría:</span> {activity.categoria}</p>
            <p><span className="activity-detail-label">Cupo:</span> {activity.cupo}</p>
          </div>
          <div className="info-section">
            <h3 style={{ fontSize: 16 }}>Descripción</h3>
            <p>{activity.descripcion}</p>
          </div>
        </div>
        <button className="activity-detail-btn" style={{ margin: '0.7rem auto 0 auto', display: 'block', width: 140, fontSize: 15 }} onClick={handleInscription}>
          Inscribirse
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailPage; 