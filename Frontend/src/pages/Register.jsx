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
      // Validar campos requeridos
      if (!form.first_name || !form.last_name || !form.email || !form.password) {
        alert('Por favor complete todos los campos')
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        alert('Por favor ingrese un email válido')
        return
      }

      const response = await axios.post(`${API_URL}/register`, form)

      if (response.data) {
        alert('Registro exitoso. Por favor inicie sesión.')
        navigate('/login')
      } else {
        throw new Error('Respuesta del servidor incompleta')
      }
    } catch (error) {
      console.error('Error en registro:', error)
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
