package services

import (
	"backend/db"
	"backend/model"
	"fmt"
)

func RegisterInscription(usuarioID int, actividadID int) error {
	// Verificar que exista el usuario
	var user model.User
	if err := db.DB.First(&user, usuarioID).Error; err != nil {
		return fmt.Errorf("el usuario con ID %d no existe", usuarioID)
	}

	// Verificar que exista la actividad
	var activity model.Activity
	if err := db.DB.First(&activity, actividadID).Error; err != nil {
		return fmt.Errorf("la actividad con ID %d no existe", actividadID)
	}

	// Verificar si ya existe la inscripción
	var existing model.Inscription
	result := db.DB.Where("user_id = ? AND activity_id = ?", usuarioID, actividadID).First(&existing)
	if result.Error == nil {
		return fmt.Errorf("el usuario ya está inscripto en esta actividad")
	}

	// Crear la inscripción
	inscripcion := model.Inscription{
		UserID:     usuarioID,
		ActivityID: actividadID,
	}

	if err := db.DB.Create(&inscripcion).Error; err != nil {
		return fmt.Errorf("error al registrar la inscripción: %w", err)
	}

	return nil
}

func GetActivitiesByUser(userID int) ([]map[string]interface{}, error) {
	var inscriptions []model.Inscription

	err := db.DB.Preload("Activity").Where("user_id = ?", userID).Find(&inscriptions).Error
	if err != nil {
		return nil, fmt.Errorf("error al obtener inscripciones del usuario: %w", err)
	}

	var activities []map[string]interface{}
	for _, ins := range inscriptions {
		activity := map[string]interface{}{
			"actividad_id": ins.ActivityID,
			"titulo":       ins.Activity.Name,
			"dia":          ins.Activity.Date,
			"profesor":     ins.Activity.Profesor,
		}
		activities = append(activities, activity)
	}

	return activities, nil
}
