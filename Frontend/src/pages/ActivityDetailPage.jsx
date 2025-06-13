import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/activity-detail.css";

const API_URL = import.meta.env.VITE_API_URL;

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/actividades/${id}`);
        setActivity(res.data);
      } catch (err) {
        setError("Actividad no encontrada");
      } finally {
        setLoading(false);
      }
    };
    const fetchMyActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_URL}/my-activities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const myActs = res.data.activities || [];
        setIsEnrolled(myActs.some(a => String(a.activity_id || a.id) === String(id)));
      } catch (err) {
        setIsEnrolled(false);
      }
    };
    fetchActivity();
    fetchMyActivities();
  }, [id]);

  const handleInscription = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.post(`${API_URL}/inscripciones`, { actividad_id: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("¡Inscripción exitosa!");
      setIsEnrolled(true);
    } catch (error) {
      alert("Error al inscribirse en la actividad");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      // Aquí deberías hacer la llamada real para desinscribirse (DELETE o similar)
      // Por ahora solo simula
      alert("Te has desinscripto de la actividad.");
      setIsEnrolled(false);
    } catch (error) {
      alert("Error al desinscribirse de la actividad");
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
        <div className="activity-detail-info" style={{ fontSize: 16, color: '#fff', textAlign: 'center', marginTop: 18 }}>
          <div className="info-section" style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 18, color: '#FFD34E', fontWeight: 700, marginBottom: 12 }}>Información General</h3>
            <div style={{ marginBottom: 8 }}><span className="activity-detail-label" style={{ color: '#FFD34E', fontWeight: 600 }}>Día:</span> {activity.day}</div>
            <div style={{ marginBottom: 8 }}><span className="activity-detail-label" style={{ color: '#FFD34E', fontWeight: 600 }}>Profesor:</span> {activity.profesor}</div>
            <div style={{ marginBottom: 8 }}><span className="activity-detail-label" style={{ color: '#FFD34E', fontWeight: 600 }}>Duración:</span> {activity.duration} min</div>
            <div style={{ marginBottom: 8 }}><span className="activity-detail-label" style={{ color: '#FFD34E', fontWeight: 600 }}>Categoría:</span> {activity.category}</div>
            <div style={{ marginBottom: 8 }}><span className="activity-detail-label" style={{ color: '#FFD34E', fontWeight: 600 }}>Cupo:</span> {activity.quota}</div>
          </div>
          <div className="info-section">
            <h3 style={{ fontSize: 18, color: '#FFD34E', fontWeight: 700, marginBottom: 8 }}>Descripción</h3>
            <div style={{ color: '#fff', fontSize: 15 }}>{activity.description}</div>
          </div>
        </div>
        <button
          onClick={isEnrolled ? handleUnsubscribe : handleInscription}
          className="activity-detail-btn"
          style={{ marginTop: 16, width: '100%', background: isEnrolled ? '#dc3545' : undefined }}
        >
          {isEnrolled ? 'Desinscribirse' : 'Inscribirse'}
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailPage; 