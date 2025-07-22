import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityList from "../components/ActivityList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyEnrolled, setShowOnlyEnrolled] = useState(false);

  // Obtener actividades del backend
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay sesión activa");
          return;
        }
        const [allRes, myRes] = await Promise.all([
          axios.get(`${API_URL}/actividades`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/my-activities`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setActivities(allRes.data || []);
        setMyActivities(myRes.data.activities || []);
        setError(null);
      } catch (err) {
        setError("Error al cargar actividades");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  // IDs de actividades inscriptas
  const myActivityIds = new Set(myActivities.map(a => a.activity_id || a.id));

  // Filtrar actividades
  const filtered = activities.filter(a => {
    const searchText = search.trim().toLowerCase();
    if (!searchText) return true;
    const fullText = [
      a.name, a.nombre, a.category, a.categoria, a.profesor, a.description, a.descripcion, a.day, a.date, a.dia
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return fullText.includes(searchText);
  });

  // Filtrado según el toggle
  const activitiesToShow = showOnlyEnrolled
    ? filtered.filter(a => myActivityIds.has(a.id) || myActivityIds.has(a.activity_id))
    : filtered.filter(a => !myActivityIds.has(a.id) && !myActivityIds.has(a.activity_id));

  const isSocio = localStorage.getItem('role') !== 'admin';

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {localStorage.getItem('role') === 'admin' && (
        <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'right', marginTop: 60 }}>
          <button
            onClick={() => {
              navigate('/admin');
            }}
            style={{
              marginBottom: 16,
              padding: '0.5rem 1.2rem',
              fontSize: 16,
              background: '#FFD34E',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Crear actividad
          </button>
        </div>
      )}
      {/* Título principal de la sección */}
      <h2 className="activities-title">TRANSFORMA TU RUTINA</h2>
      {/* Toggle para socios */}
      {isSocio && (
        <div style={{ maxWidth: 600, margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
          <button
            onClick={() => setShowOnlyEnrolled(v => !v)}
            style={{
              marginBottom: 16,
              padding: '0.5rem 1.2rem',
              fontSize: 16,
              background: showOnlyEnrolled ? '#FFD34E' : '#eee',
              color: showOnlyEnrolled ? '#222' : '#888',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            {showOnlyEnrolled ? 'Ver actividades disponibles para inscribirme' : 'Ver solo mis actividades inscriptas'}
          </button>
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 60 }}>Cargando actividades...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', marginTop: 60, color: 'red' }}>{error}</div>
      ) : (
        <ActivityList
          activities={activitiesToShow}
          onSelect={activity => navigate(`/actividad/${activity.id}`)}
          showLogo={true}
        />
      )}
    </div>
  );
};

export default Home; 