package inscription

import (
	"backend/db"
	"backend/model"
)

// Crea la inscripción en la base de datos
func CreateInscription(ins *model.Inscription) error {
	return db.DB.Create(ins).Error // Inserta el registro en la tabla "inscriptions"
}


func GetInscriptionsByUserID(userID int) ([]model.Activity, error) {
	var activities []model.Activity

	// Hace una consulta JOIN entre "activities" e "inscriptions"
	// para obtener las actividades donde el usuario esté inscripto
	err := db.DB.
		Table("activities").
		Select("activities.id, activities.name, activities.date, activities.profesor").
		Joins("JOIN inscriptions ON inscriptions.activity_id = activities.id").
		Where("inscriptions.user_id = ?", userID).
		Scan(&activities).Error // Llena el slice "activities" con los resultados

	return activities, err // Devuelve la lista de actividades o el error
}

