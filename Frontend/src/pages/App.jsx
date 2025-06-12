import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import ActivityDetailPage from "./ActivityDetailPage";
import MyActivitiesPage from "./MyActivities";
import AdminPage from "./Admin";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import LogoutButton from "../components/LogoutButton";
import SearchBar from "../components/SearchBar";

function Header({ showSearch, search, setSearch }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.1rem 2.5rem 1.1rem 2.5rem',
      background: '#222',
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      zIndex: 100,
      minHeight: 60,
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '30vw', color: '#FFD34E' }}>FORMA NOVA</h1>
      {showSearch && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginLeft: 30, marginRight: 30 }}>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      )}
      <div style={{ marginLeft: 30 }}><LogoutButton /></div>
    </header>
  );
}

// Componente para rutas protegidas
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token || !role) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Componente para rutas públicas (login y registro)
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token && role) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const showSearch = location.pathname === "/";
  // El header solo no se muestra en login/register
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header showSearch={showSearch} search={search} setSearch={setSearch} />}
      <div style={{ paddingTop: hideHeader ? 0 : 90 }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home search={search} setSearch={setSearch} />
            </ProtectedRoute>
          } />
          <Route path="/actividad/:id" element={
            <ProtectedRoute>
              <ActivityDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/mis-actividades" element={
            <ProtectedRoute>
              <MyActivitiesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />

          {/* Redirigir cualquier otra ruta al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App; 