import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", cupo: "", dia: "", profesor: "", duracion: "", categoria: "" });
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
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editing) {
        await axios.put(`${API_URL}/actividades/${editing}`, form, config);
        setMessage("Actividad editada correctamente");
      } else {
        await axios.post(`${API_URL}/actividades`, form, config);
        setMessage("Actividad creada correctamente");
      }
      fetchActivities();
      setForm({ nombre: "", cupo: "", dia: "", profesor: "", duracion: "", categoria: "" });
      setEditing(null);
      setShowCreateForm(false);
    } catch (error) {
      setMessage("Error al guardar la actividad");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = activity => {
    setForm({
      nombre: activity.nombre || "",
      cupo: activity.cupo || "",
      dia: activity.dia || "",
      profesor: activity.profesor || "",
      duracion: activity.duracion || "",
      categoria: activity.categoria || ""
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
      <div className="admin-content-wrapper">
        <div className="admin-welcome">
          <h2>Bienvenido {userName}</h2>
        </div>

        <div className="admin-actions">
          <button
            className="admin-action-button create"
            onClick={() => {
              setShowCreateForm(true);
              setEditing(null);
              setForm({ nombre: "", cupo: "", dia: "", profesor: "", duracion: "", categoria: "" });
              setMessage("");
            }}
          >
            Crear Actividad
          </button>
          <button
            className="admin-action-button delete"
            onClick={() => {
              setShowCreateForm(false);
              setMessage("");
            }}
          >
            Eliminar Actividad
          </button>
        </div>

        {message && <div className="admin-message">{message}</div>}

        {showCreateForm && (
          <div className="admin-form-container">
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
                <input
                  name="cupo"
                  value={form.cupo}
                  onChange={handleChange}
                  placeholder="Cupo"
                  required
                />
                <input
                  name="dia"
                  value={form.dia}
                  onChange={handleChange}
                  placeholder="Día"
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
                  name="duracion"
                  value={form.duracion}
                  onChange={handleChange}
                  placeholder="Duración (minutos)"
                  type="number"
                  min="1"
                  required
                />
                <input
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  placeholder="Categoría"
                  required
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
                      setForm({ nombre: "", cupo: "", dia: "", profesor: "", duracion: "", categoria: "" });
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

        <div className="activities-grid">
          {(activities || []).map(activity => (
            <div key={activity.actividad_id || activity.id} className="activity-card">
              <h3>{activity.nombre}</h3>
              <p><b>Cupo:</b> {activity.cupo}</p>
              <p><b>Día:</b> {activity.dia}</p>
              <p><b>Profesor:</b> {activity.profesor}</p>
              <p><b>Duración:</b> {activity.duracion} min</p>
              <p><b>Categoría:</b> {activity.categoria}</p>
              <div className="activity-actions">
                <button
                  onClick={() => handleEdit(activity)}
                  className="admin-button edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(activity.actividad_id || activity.id)}
                  className="admin-button delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 