import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", imageUrl: "" });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/');
      return;
    }
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/actividades`);
      setActivities(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
      setMessage('Error al cargar las actividades');
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.dia || form.dia.trim() === "") {
        setMessage("El campo Día es obligatorio.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        name: form.nombre,
        description: form.descripcion,
        category: form.categoria,
        date: form.dia,
        duration: parseInt(form.duracion, 10),
        quota: parseInt(form.cupo, 10),
        profesor: form.profesor,
        imageUrl: form.imageUrl
      };
      console.log('Payload:', payload);
      if (editing) {
        await axios.put(`${API_URL}/actividades/${editing}`, payload, config);
        setMessage("Actividad editada correctamente");
      } else {
        const response = await axios.post(`${API_URL}/actividades`, payload, config);
        console.log('Response:', response.data);
        setMessage("Actividad creada correctamente");
      }
      fetchActivities();
      setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", imageUrl: "" });
      setEditing(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error response:', error.response?.data);
      setMessage(error.response?.data?.error || "Error al guardar la actividad");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = activity => {
    setForm({
      nombre: activity.nombre || activity.name || "",
      descripcion: activity.descripcion || activity.description || "",
      categoria: activity.categoria || activity.category || "",
      dia: activity.date || "",
      duracion: activity.duracion || activity.duration || "",
      cupo: activity.cupo || activity.quota || "",
      profesor: activity.profesor || "",
      imageUrl: activity.imageUrl || ""
    });
    setEditing(activity.id || activity.actividad_id);
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${API_URL}/actividades/${id}`, config);
        setMessage("Actividad eliminada correctamente");
        fetchActivities();
      } catch (error) {
        setMessage("Error al eliminar la actividad");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-content-wrapper" style={{ paddingTop: 110, paddingLeft: 16, paddingRight: 16, maxWidth: 1200, margin: '0 auto' }}>
        <div className="admin-welcome" style={{ textAlign: 'center', marginBottom: 0 }}>
          <h2>Bienvenido {userName}</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0 24px 0' }}>
          <button
            className="admin-action-button create"
            style={{ fontSize: 22, padding: '1rem 2.5rem', background: '#FFD34E', color: '#222', fontWeight: 700, border: 'none', borderRadius: 12, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            onClick={() => {
              setShowCreateForm(true);
              setEditing(null);
              setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", imageUrl: "" });
              setMessage("");
            }}
          >
            Crear Actividad
          </button>
        </div>


        {message && <div className="admin-message">{message}</div>}

        {showCreateForm && (
          <div className="admin-form-container" style={{ marginTop: 60, marginBottom: 40 }}>
            <div className="admin-form">
              <h2>{editing ? "Editar Actividad" : "Crear Nueva Actividad"}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  required
                />
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  rows={3}
                  style={{ resize: 'vertical', padding: '0.8rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '1rem' }}
                  required
                />
                <input
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  placeholder="Categoría"
                  required
                />
                <input
                  name="dia"
                  value={form.dia}
                  onChange={handleChange}
                  type="text"
                  placeholder="Día o días (ej: Lunes, Miércoles y Viernes)"
                  required
                />
                <input
                  name="duracion"
                  value={form.duracion}
                  onChange={handleChange}
                  placeholder="Duración (minutos)"
                  type="number"
                  min="1"
                  required
                />
                <input
                  name="cupo"
                  value={form.cupo}
                  onChange={handleChange}
                  placeholder="Cupo"
                  type="number"
                  min="1"
                  required
                />
                <input
                  name="profesor"
                  value={form.profesor}
                  onChange={handleChange}
                  placeholder="Profesor"
                  required
                />
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="URL de la imagen"
                  type="url"
                />
                <div className="form-buttons">
                  <button type="submit" className="admin-button">
                    {editing ? "Guardar Cambios" : "Crear Actividad"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditing(null);
                      setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", imageUrl: "" });
                    }}
                    className="admin-button cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {!showCreateForm && (
          <div className="activities-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
            marginTop: 10,
            width: '100%',
            alignItems: 'stretch',
            maxHeight: 'calc(100vh - 220px)',
            overflowY: 'auto',
            paddingBottom: 24,
          }}>
            {(activities && activities.length > 0) ? (
              activities.map(activity => {
                console.log('Actividad:', activity);
                return (
                  <div key={activity.id || activity.actividad_id} className="activity-card" style={{
                    background: '#181818',
                    border: '2px solid #FFD34E',
                    borderRadius: 14,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem 1rem',
                    minHeight: 120,
                    maxWidth: 220,
                    margin: '0 auto',
                    width: '100%',
                  }}>
                    <div className="activity-icon" style={{ fontSize: 32, color: '#FFD34E', marginBottom: 8 }}>
                      <span role="img" aria-label="actividad">🏋️‍♂️</span>
                    </div>
                    <div className="activity-name">{activity.name}</div>
                    <div className="activity-info">
                      <div className="activity-day" style={{ color: '#fff' }}>{activity.date}</div>
                      <div className="activity-prof" style={{ color: '#fff' }}>{activity.profesor}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                      <button
                        onClick={() => handleEdit(activity)}
                        className="admin-button edit"
                        style={{ background: '#28a745', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id || activity.actividad_id)}
                        className="admin-button delete"
                        style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem', marginTop: '2rem' }}>
                No hay actividades para mostrar.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 