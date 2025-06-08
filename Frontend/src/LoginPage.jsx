import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      })

      const { token, name, user_id } = response.data

      // Guardar en localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userName', name)
      localStorage.setItem('userId', user_id)

      alert('Login exitoso. ¡Bienvenido, ' + name + '!')
      navigate('/') // redirigí al home
    } catch (error) {
      alert(error.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  )
}

export default LoginPage
