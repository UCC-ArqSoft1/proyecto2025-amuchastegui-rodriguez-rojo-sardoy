import React, { useState } from "react";
import ActivityList from "../components/ActivityList";

const initialActivities = [
  { id: 1, title: "Fútbol", schedule: "Lunes 18:00", instructor: "Prof. Gómez", category: "Deporte" },
  { id: 2, title: "Yoga", schedule: "Martes 10:00", instructor: "Prof. Pérez", category: "Bienestar" },
];

const AdminPage = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [form, setForm] = useState({ title: "", schedule: "", instructor: "", category: "" });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      setActivities(acts => acts.map(a => a.id === editing ? { ...a, ...form } : a));
      setMessage("Actividad editada correctamente");
    } else {
      setActivities(acts => [...acts, { ...form, id: Date.now() }]);
      setMessage("Actividad creada correctamente");
    }
    setForm({ title: "", schedule: "", instructor: "", category: "" });
    setEditing(null);
    setTimeout(() => setMessage(""), 1500);
  };

  const handleEdit = activity => {
    setForm(activity);
    setEditing(activity.id);
  };

  const handleDelete = id => {
    setActivities(acts => acts.filter(a => a.id !== id));
    setMessage("Actividad eliminada correctamente");
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Administrar actividades</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required style={{ marginRight: 8 }} />
        <input name="schedule" value={form.schedule} onChange={handleChange} placeholder="Horario" required style={{ marginRight: 8 }} />
        <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor" required style={{ marginRight: 8 }} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required style={{ marginRight: 8 }} />
        <button type="submit">{editing ? "Editar" : "Crear"}</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ActivityList activities={activities} onSelect={handleEdit} />
      <ul>
        {activities.map(a => (
          <li key={a.id} style={{ marginTop: 8 }}>
            <button onClick={() => handleEdit(a)} style={{ marginRight: 8 }}>Editar</button>
            <button onClick={() => handleDelete(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage; 