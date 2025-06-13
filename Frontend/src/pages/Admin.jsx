import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", image: null });
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

  const handleChange = e => {
    if (e.target.type === "file") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.dia || form.dia.trim() === "") {
        setMessage("El campo Día es obligatorio.");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const formData = new FormData();
      formData.append("name", form.nombre);
      formData.append("description", form.descripcion);
      formData.append("category", form.categoria);
      formData.append("date", form.dia);
      formData.append("duration", form.duracion);
      formData.append("quota", form.cupo);
      formData.append("profesor", form.profesor);
      if (form.image) {
        formData.append("image", form.image);
      }
      if (editing) {
        await axios.put(`${API_URL}/actividades/${editing}`, formData, { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } });
        setMessage("Actividad editada correctamente");
      } else {
        await axios.post(`${API_URL}/actividades`, formData, { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } });
        setMessage("Actividad creada correctamente");
      }
      fetchActivities();
      setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", image: null });
      setEditing(null);
      setShowCreateForm(false);
    } catch (error) {
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
      image: null // No se puede previsualizar la imagen existente
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
      <div className="admin-content-wrapper admin-content-padded">
        <div className="admin-welcome" style={{ textAlign: 'center', marginBottom: 0 }}>
          <h2>Bienvenido {userName}</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '64px 0 24px 0' }}>
          <button
            className="admin-action-button create"
            style={{ fontSize: 22, padding: '1rem 2.5rem', background: '#FFD34E', color: '#222', fontWeight: 700, border: 'none', borderRadius: 12, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            onClick={() => {
              setShowCreateForm(true);
              setEditing(null);
              setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", image: null });
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
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
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
                      setForm({ nombre: "", descripcion: "", categoria: "", dia: "", duracion: "", cupo: "", profesor: "", image: null });
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
          <div className="activities-grid admin-activities-grid">
            {(activities && activities.length > 0) ? (
              activities.map(activity => (
                <div key={activity.id || activity.actividad_id} className="activity-card">
                  <div className="activity-name">{activity.name}</div>
                  <div className="activity-info">
                    <div className="activity-day">{activity.date}</div>
                    <div className="activity-prof">{activity.profesor}</div>
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
              ))
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