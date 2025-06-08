import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
      await axios.post('http://localhost:8080/register', form)
      alert('Registro exitoso')
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrarse')
    }
  }

 return (
  <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
    <h2>Registro</h2>
    <input
      name="first_name"
      placeholder="Nombre"
      value={form.first_name}
      onChange={handleChange}
      style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
    />
    <input
      name="last_name"
      placeholder="Apellido"
      value={form.last_name}
      onChange={handleChange}
      style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
    />
    <input
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
    />
    <input
      name="password"
      type="password"
      placeholder="Contraseña"
      value={form.password}
      onChange={handleChange}
      style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
    />
    <button onClick={handleRegister}>Registrarse</button>
  </div>
)

}

export default RegisterPage
