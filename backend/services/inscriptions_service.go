package services

import (
	"backend/clients/inscription"
	"backend/db"
	"backend/dto"
	"backend/model"
	"fmt"
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
