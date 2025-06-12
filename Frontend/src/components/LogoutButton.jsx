import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <button onClick={handleLogout} style={{ marginLeft: 16 }}>Cerrar sesión</button>
  );
};

export default LogoutButton; 