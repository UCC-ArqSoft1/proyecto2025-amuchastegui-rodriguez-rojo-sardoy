import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css';

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      })

      const { token, name, user_id, role } = response.data

      if (!token || !name || !user_id || !role) {
        throw new Error('Respuesta del servidor incompleta')
      }

      // Guardar en localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userName', name)
      localStorage.setItem('userId', user_id)
      localStorage.setItem('role', role)

      alert('Login exitoso. ¡Bienvenido, ' + name + '!')
      navigate('/') // redirigí al home
    } catch (error) {
      console.error('Error en login:', error)
      alert(error.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="login-bg">
      <div className="login-header">
        <div className="login-logo">FORMA NOVA</div>
        <Link to="/register" className="login-register-btn">
          Registrarse
        </Link>
      </div>
      <div className="login-center">
        <h1 className="login-title">BIENVENIDOS</h1>
        <div className="login-form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-btn">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
