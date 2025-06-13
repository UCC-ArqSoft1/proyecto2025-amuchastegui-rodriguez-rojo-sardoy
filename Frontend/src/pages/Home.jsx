import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityList from "../components/ActivityList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const res = await axios.get(`${API_URL}/actividades`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities(res.data || []);
        setError(null);
      } catch (err) {
        setError("Error al cargar actividades");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  // Filtrar actividades
  const filtered = activities.filter(a => {
    const searchText = search.trim().toLowerCase();
    if (!searchText) return true;
    // Unir todos los campos relevantes en un solo string
    const fullText = [
      a.name, a.nombre, a.category, a.categoria, a.profesor, a.description, a.descripcion, a.day, a.date, a.dia
    ]
      .filter(Boolean)
      .join(' ') // Unir con espacios
      .toLowerCase();
    return fullText.includes(searchText);
  });

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
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 60 }}>Cargando actividades...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', marginTop: 60, color: 'red' }}>{error}</div>
      ) : (
        <ActivityList
          activities={filtered}
          onSelect={activity => navigate(`/actividad/${activity.id}`)}
          showLogo={true}
        />
      )}
    </div>
  );
};

export default Home; 