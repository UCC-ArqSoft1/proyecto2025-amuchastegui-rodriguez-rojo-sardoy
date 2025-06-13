package activity

import (
	"backend/db"    // Conexión a la base de datos (GORM)
	"backend/model" // Modelo de datos: estructura Activity
)

// Obtener una actividad por su ID (incluye sus inscripciones)
func GetActivityByID(id uint) (*model.Activity, error) {
	var activity model.Activity
	result := db.DB.Preload("Inscriptions").First(&activity, id) // Busca la actividad por ID y carga también las inscripciones relacionadas
	return &activity, result.Error                               // Devuelve puntero a la actividad y error si ocurrió
}

// Obtener todas las actividades registradas
func GetAllActivities() ([]model.Activity, error) {
	var activities []model.Activity
	result := db.DB.Find(&activities) // Consulta todas las actividades sin filtros
	return activities, result.Error   // Devuelve el slice y error si hubo
}

// Crear una nueva actividad en la base de datos
func CreateActivity(activity *model.Activity) error {
	result := db.DB.Create(activity) // Inserta la nueva actividad
	return result.Error              // Devuelve error si falló
}

// Actualizar una actividad existente
func UpdateActivity(activity *model.Activity) error {
	result := db.DB.Save(activity) // Actualiza los datos de la actividad en base al ID
	return result.Error            // Devuelve error si hubo problema
}

// Eliminar una actividad por su ID
func DeleteActivity(id uint) error {
	result := db.DB.Delete(&model.Activity{}, id) // Borra la actividad directamente por ID
	return result.Error                           // Devuelve error si hubo fallo
}
