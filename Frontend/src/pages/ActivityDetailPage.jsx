import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActivityDetail from "../components/ActivityDetail";

// Simulación de datos detallados
const activities = [
  { id: 1, title: "Fútbol", description: "Partido semanal de fútbol.", image: "https://images.pexels.com/photos/46798/pexels-photo-46798.jpeg", instructor: "Prof. Gómez", schedule: "Lunes 18:00", duration: "1h", capacity: 20, category: "Deporte" },
  { id: 2, title: "Yoga", description: "Clase de yoga para todos los niveles.", image: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg", instructor: "Prof. Pérez", schedule: "Martes 10:00", duration: "1h", capacity: 15, category: "Bienestar" },
  { id: 3, title: "Natación", description: "Entrenamiento de natación.", image: "https://images.pexels.com/photos/261185/pexels-photo-261185.jpeg", instructor: "Prof. López", schedule: "Miércoles 15:00", duration: "1h", capacity: 10, category: "Deporte" },
];

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const activity = activities.find(a => a.id === Number(id));

  const handleInscribir = () => {
    // Simulación de inscripción
    setTimeout(() => {
      setMessage("¡Inscripción exitosa!");
      setTimeout(() => navigate("/mis-actividades"), 1500);
    }, 1000);
  };

  return (
    <div>
      <ActivityDetail activity={activity} />
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <button onClick={handleInscribir} style={{ padding: '0.5rem 1.5rem', fontSize: 16 }}>Inscribirse</button>
        {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}
      </div>
    </div>
  );
};

export default ActivityDetailPage; 