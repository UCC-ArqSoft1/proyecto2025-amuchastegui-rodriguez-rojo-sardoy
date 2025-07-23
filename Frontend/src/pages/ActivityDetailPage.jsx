import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/activity-detail.css";



const API_URL = import.meta.env.VITE_API_URL;

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/actividades/${Number(id)}`);
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
        console.log('Mis actividades:', myActs);
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
      console.log('Token:', token);
      if (!token) {
        navigate("/login");
        return;
      }
      const payload = { actividad_id: Number(id) };
      console.log('Payload:', JSON.stringify(payload));
      const res = await axios.post(`${API_URL}/inscripciones`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', res.data);
      alert("¡Inscripción exitosa!");
      setIsEnrolled(true);
    } catch (error) {
      console.error('Error completo:', error);
      alert(error.response?.data?.error || "Error al inscribirse en la actividad");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.delete(`${API_URL}/inscripciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Te has desinscripto de la actividad.");
      setIsEnrolled(false);
      window.location.reload();
    } catch (error) {
      alert("Error al desinscribirse de la actividad");
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!activity) return <div className="error">Actividad no encontrada</div>;

  console.log('Detalle actividad:', activity);

  // Calcular si el cupo está completo solo si activity existe
  // (esto previene errores de acceso a null)
  // Puedes volver a usar esta lógica si la necesitas en el futuro:
  // const cupoCompleto = activity.inscriptions && activity.inscriptions.length >= activity.quota;

  return (
    <div className="activity-detail-bg">
      <div className="activity-detail-card">

        {/* Header: volver + título en la misma línea */}
        <div className="activity-header-row">
          <button className="activity-back-button" style={{ marginRight: '0.05rem' }} onClick={() => navigate(-1)}>
            Volver
          </button>
          <h1 className="activity-detail-title">{activity.name}</h1>
        </div>
        {/* Imagen */}
        <div className="activity-detail-image">
          <img
            src={`${API_URL}${activity.image_url}` || "https://via.placeholder.com/300x120?text=Actividad"}
            alt={activity.name}
          />
        </div>
        {/* Info general + descripción */}
        <div className="activity-detail-info">
          <div className="info-section">
            <h3>Información General</h3>
            <div><span className="activity-detail-label">Día:</span> {activity.date}</div>
            <div><span className="activity-detail-label">Profesor:</span> {activity.profesor}</div>
            <div><span className="activity-detail-label">Duración:</span> {activity.duration} min</div>
            <div><span className="activity-detail-label">Categoría:</span> {activity.category}</div>
            <div><span className="activity-detail-label">Cupo:</span> {activity.quota}</div>
          </div>

          <div className="info-section" style={{ marginTop: '-0.2rem' }}>
            <h3>Descripción</h3>
            <div>{activity.description}</div>
          </div>
        </div>

        {/* Botón de inscripción */}
        <button
          onClick={isEnrolled ? handleUnsubscribe : handleInscription}
          className="activity-detail-btn"
          style={{
            background: isEnrolled ? '#dc3545' : '#FFD34E',
            color: isEnrolled ? '#fff' : '#222'
          }}
        >
          {isEnrolled ? 'Desinscribirse' : 'Inscribirse'}
        </button>
      </div>
    </div>
  );



};

export default ActivityDetailPage; 