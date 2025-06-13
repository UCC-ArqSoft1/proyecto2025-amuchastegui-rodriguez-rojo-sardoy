import React, { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MyActivitiesPage = () => {
  const navigate = useNavigate();
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_URL}/my-activities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyActivities(res.data.activities || []);
        setError(null);
      } catch (err) {
        setMyActivities([]);
        setError("Error al cargar tus actividades");
      } finally {
        setLoading(false);
      }
    };
    fetchMyActivities();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2 style={{ color: '#FFD34E', textAlign: 'center', fontWeight: 700, fontSize: 26, marginBottom: 20 }}>
        Mis actividades deportivas
      </h2>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 60 }}>Cargando actividades...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', marginTop: 60, color: 'red' }}>{error}</div>
      ) : (
        <ActivityList activities={myActivities} onSelect={a => navigate(`/actividad/${a.id}`)} showLogo={false} />
      )}
    </div>
  );
};

export default MyActivitiesPage; 