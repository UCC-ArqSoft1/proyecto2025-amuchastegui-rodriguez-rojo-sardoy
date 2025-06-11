import React from "react";
import { useNavigate } from "react-router-dom";
import ActivityList, { activityData } from "../components/ActivityList";

const Home = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const activities = activityData;

  const filtered = activities.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.dia.toLowerCase().includes(search.toLowerCase()) ||
    a.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <ActivityList
        activities={filtered}
        onSelect={activity => navigate(`/actividad/${activity.actividad_id}`)}
        showLogo={true}
      />
    </div>
  );
};

export default Home; 