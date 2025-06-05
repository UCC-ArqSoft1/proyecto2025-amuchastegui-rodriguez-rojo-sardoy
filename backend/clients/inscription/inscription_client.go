package inscription

import (
	"backend/db"
	"backend/model"
)

// Crea la inscripción en la base de datos
func CreateInscription(ins *model.Inscription) error {
	return db.DB.Create(ins).Error
}

func GetInscriptionsByUserID(userID int) ([]model.Activity, error) {
	var activities []model.Activity

	err := db.DB.
		Table("activities").
		Select("activities.id, activities.name, activities.date, activities.profesor").
		Joins("JOIN inscriptions ON inscriptions.activity_id = activities.id").
		Where("inscriptions.user_id = ?", userID).
		Scan(&activities).Error

	return activities, err
}
