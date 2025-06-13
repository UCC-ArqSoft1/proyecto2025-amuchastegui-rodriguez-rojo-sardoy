package services

import (
	"backend/clients/inscription"
	"backend/db"
	"backend/dto"
	"backend/model"
	"fmt"
	"log"
	"time"
)

func RegisterInscription(userID int, input dto.RegisterInscriptionRequest) error {
	if input.ActivityID <= 0 {
		return fmt.Errorf("ID de actividad inválido")
	}

	// ✅ Validar si ya está inscrito
	var count int64
	err := db.DB.
		Model(&model.Inscription{}).
		Where("user_id = ? AND activity_id = ?", userID, input.ActivityID).
		Count(&count).Error
	if err != nil {
		return fmt.Errorf("error validando inscripción existente: %w", err)
	}
	if count > 0 {
		return fmt.Errorf("ya estás inscrito en esta actividad")
	}

	// Validar cupo
	activity, err := GetActivityByID(input.ActivityID)
	if err != nil {
		return fmt.Errorf("Actividad no encontrada")
	}
	if len(activity.Inscriptions) >= activity.Quota {
		return fmt.Errorf("El cupo de la actividad está completo")
	}

	newInscription := model.Inscription{
		UserID:           userID,
		ActivityID:       input.ActivityID,
		RegistrationDate: time.Now().Format("2006-01-02"),
	}

	if err := inscription.CreateInscription(&newInscription); err != nil {
		return fmt.Errorf("error al registrar inscripción: %w", err)
	}

	return nil
}

func GetMyActivities(userID int) ([]dto.ActivityInscription, error) {
	activities, err := inscription.GetInscriptionsByUserID(userID)
	if err != nil {
		return nil, err
	}

	var result []dto.ActivityInscription
	for _, act := range activities {
		result = append(result, dto.ActivityInscription{
			ActivityID: act.ID,
			Title:      act.Name,
			Day:        act.Date,
			Instructor: act.Profesor,
		})
	}

	return result, nil
}

func Unsubscribe(userID int, activityID int) error {
	log.Printf("Intentando desinscribir: userID=%d, activityID=%d", userID, activityID)
	// Eliminar la inscripción de la base de datos
	result := db.DB.
		Where("user_id = ? AND activity_id = ?", userID, activityID).
		Delete(&model.Inscription{})

	if result.Error != nil {
		log.Printf("Error al eliminar inscripción: %v", result.Error)
		return fmt.Errorf("error al eliminar la inscripción: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		log.Printf("No se encontró inscripción para eliminar: userID=%d, activityID=%d", userID, activityID)
		return fmt.Errorf("no se encontró una inscripción para eliminar")
	}

	log.Printf("Desinscripción exitosa: userID=%d, activityID=%d", userID, activityID)
	return nil
}

