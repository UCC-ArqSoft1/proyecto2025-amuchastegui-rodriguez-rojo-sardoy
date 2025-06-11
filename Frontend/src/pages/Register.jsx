import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css';

const API_URL = import.meta.env.VITE_API_URL;

function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, form)
      alert('Registro exitoso')
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrarse')
    }
  }

  return (
    <div className="login-bg">
      <div className="login-header">
        <div className="login-logo">FORMA NOVA</div>
        <Link to="/login" className="login-register-btn">
          Iniciar sesión
        </Link>
      </div>
      <div className="login-center">
        <h1 className="login-title">REGISTRARSE</h1>
        <div className="login-form-container">
          <input
            name="first_name"
            placeholder="Nombre"
            value={form.first_name}
            onChange={handleChange}
            className="login-input"
          />
          <input
            name="last_name"
            placeholder="Apellido"
            value={form.last_name}
            onChange={handleChange}
            className="login-input"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="login-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="login-input"
          />
          <button onClick={handleRegister} className="login-btn">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
