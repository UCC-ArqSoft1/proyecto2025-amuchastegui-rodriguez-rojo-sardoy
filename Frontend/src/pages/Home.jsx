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
  const [myActivities, setMyActivities] = useState([]);

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
    const fetchMyActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_URL}/my-activities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyActivities(res.data.activities || []);
      } catch (err) {
        setMyActivities([]);
      }
    };
    fetchActivities();
    fetchMyActivities();
  }, []);

  // Filtrar actividades
  const filtered = activities.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.day?.toLowerCase().includes(search.toLowerCase()) ||
    a.profesor?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {myActivities.length > 0 && (
        <div style={{ maxWidth: 900, margin: '2rem auto 1rem auto' }}>
          <h3 style={{ color: '#FFD34E', textAlign: 'center', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
            ¡Ya estás inscripto en {myActivities.length} actividad{myActivities.length > 1 ? 'es' : ''}!
          </h3>
          <ActivityList
            activities={myActivities}
            onSelect={activity => navigate(`/actividad/${activity.id}`)}
            showLogo={false}
          />
        </div>
      )}
      {localStorage.getItem('role') === 'admin' && (
        <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'right', marginTop: 60 }}>
          <button
            onClick={() => {
              console.log('Current role:', localStorage.getItem('role'));
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