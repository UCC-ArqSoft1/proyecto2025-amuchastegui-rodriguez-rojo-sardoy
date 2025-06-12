import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CreateActivity = () => {
  const navigate = useNavigate();
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
  if (userRole !== "admin") {
    return <div style={{ textAlign: 'center', marginTop: 60, color: 'red' }}>Acceso solo para administradores</div>;
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("Error al crear actividad");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#f9f9f9', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <h2>Cargar nueva actividad</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required style={{ flex: 1 }} />
        <input name="dia" value={form.dia} onChange={handleChange} placeholder="Día(s)" required style={{ flex: 1 }} />
        <input name="profesor" value={form.profesor} onChange={handleChange} placeholder="Profesor/a" required style={{ flex: 1 }} />
        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" required style={{ flex: 1 }} />
        <input name="cupo" value={form.cupo} onChange={handleChange} placeholder="Cupo" type="number" min="1" required style={{ flex: 1 }} />
        <input name="duracion" value={form.duracion} onChange={handleChange} placeholder="Duración (min)" type="number" min="1" required style={{ flex: 1 }} />
        <button type="submit" style={{ flexBasis: '100%' }}>Crear actividad</button>
      </form>
      {message && <p style={{ color: message.includes("Error") ? 'red' : 'green' }}>{message}</p>}
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

export default CreateActivity; 