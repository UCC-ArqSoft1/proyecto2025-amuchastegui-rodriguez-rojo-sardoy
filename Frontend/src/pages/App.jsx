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
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#222', color: '#fff' }}>
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
  // No muestro el header en login/register
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/actividad/:id" element={<PrivateRoute><ActivityDetailPage /></PrivateRoute>} />
        <Route path="/mis-actividades" element={<PrivateRoute><MyActivitiesPage /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App; 