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
import CreateActivity from "./CreateActivity";

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
  const [search, setSearch] = useState("");
  const showSearch = location.pathname === "/";
  // El header solo no se muestra en login/register
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideHeader && <Header showSearch={showSearch} search={search} setSearch={setSearch} />}
      <div style={{ paddingTop: 90 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
          <Route path="/actividad/:id" element={<ActivityDetailPage />} />
          <Route path="/mis-actividades" element={<MyActivitiesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/crear-actividad" element={<CreateActivity />} />
        </Routes>
      </div>
    </>
  );
}

export default App; 