import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HomePage() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/activities')
      .then(response => setActivities(response.data))
      .catch(error => {
        console.error('Error al obtener actividades:', error)
        alert('No se pudieron cargar las actividades')
      })
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Actividades disponibles</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.ID}>
            <strong>{activity.Titulo}</strong> – {activity.Horario} – Prof: {activity.Profesor}
          </li>
        ))}
      </ul>
    </div>
  )
}
