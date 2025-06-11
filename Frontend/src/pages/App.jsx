import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Home";
import ActivityDetailPage from "./ActivityDetailPage";
import MyActivitiesPage from "./MyActivities";
import AdminPage from "./Admin";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import LogoutButton from "../components/LogoutButton";

function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#222', color: '#fff', position: 'relative', zIndex: 20 }}>
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 2 }}>FROMA NOVA</h1>
      <LogoutButton />
    </header>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/" replace />;
}

function App() {
  const location = useLocation();
  // El header solo no se muestra en login/register
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/actividad/:id" element={<ActivityDetailPage />} />
        <Route path="/mis-actividades" element={<MyActivitiesPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App; 