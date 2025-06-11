import React from "react";
import ActivityList from "../components/ActivityList";
import { useNavigate } from "react-router-dom";

// Simulación de actividades inscriptas
const myActivities = [
  { id: 1, title: "Fútbol", schedule: "Lunes 18:00", instructor: "Prof. Gómez", category: "Deporte" },
  { id: 2, title: "Yoga", schedule: "Martes 10:00", instructor: "Prof. Pérez", category: "Bienestar" },
];

const MyActivitiesPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Mis actividades deportivas</h2>
      <ActivityList activities={myActivities} onSelect={a => navigate(`/actividad/${a.id}`)} />
    </div>
  );
};

export default MyActivitiesPage; 