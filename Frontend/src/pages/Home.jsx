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
  const [form, setForm] = useState({
    nombre: "",
    dia: "",
    profesor: "",
    categoria: "",
    cupo: "",
    duracion: "",
  });
  const [message, setMessage] = useState("");

  // Detectar si el usuario es admin
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";

  // Obtener actividades del backend
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/actividades`);
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
  const filtered = activities.filter(a =>
    a.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    a.dia?.toLowerCase().includes(search.toLowerCase()) ||
    a.categoria?.toLowerCase().includes(search.toLowerCase())
  );

  // Manejar cambios en el formulario
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear actividad (solo admin)
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/actividades`,
        {
          nombre: form.nombre,
          dia: form.dia,
          profesor: form.profesor,
          categoria: form.categoria,
          cupo: parseInt(form.cupo),
          duracion: parseInt(form.duracion),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Actividad creada correctamente");
      setForm({ nombre: "", dia: "", profesor: "", categoria: "", cupo: "", duracion: "" });
      // Recargar actividades
      const res = await axios.get(`${API_URL}/actividades`);
      setActivities(res.data || []);
    } catch (err) {
      setMessage("Error al crear actividad");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {isAdmin && (
        <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'right' }}>
          <button onClick={() => navigate('/crear-actividad')} style={{ marginBottom: 16, padding: '0.5rem 1.2rem', fontSize: 16, background: '#FFD34E', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
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
          onSelect={activity => navigate(`/actividad/${activity.actividad_id}`)}
          showLogo={true}
        />
      )}
    </div>
  );
};

export default Home; 