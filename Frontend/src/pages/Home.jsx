import React, { useState } from "react";
import ActivityList from "../components/ActivityList";
import SearchBar from "../components/SearchBar";

// Simulación de datos (luego se puede conectar al backend)
const initialActivities = [
  { id: 1, title: "Fútbol", schedule: "Lunes 18:00", instructor: "Prof. Gómez", category: "Deporte" },
  { id: 2, title: "Yoga", schedule: "Martes 10:00", instructor: "Prof. Pérez", category: "Bienestar" },
  { id: 3, title: "Natación", schedule: "Miércoles 15:00", instructor: "Prof. López", category: "Deporte" },
];

const Home = ({ onSelectActivity }) => {
  const [search, setSearch] = useState("");
  const [activities] = useState(initialActivities);

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.schedule.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Actividades deportivas</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <ActivityList activities={filtered} onSelect={onSelectActivity} />
    </div>
  );
};

export default Home; 