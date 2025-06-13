package services

import (
	"backend/clients/inscription"
	"backend/db"
	"backend/dto"
	"backend/model"
	"fmt"
	"time"

	"gorm.io/gorm"
)

func RegisterInscription(userID int, input dto.RegisterInscriptionRequest) error {
	if input.ActivityID <= 0 {
		return fmt.Errorf("ID de actividad inválido") // Validación básica del ID
	}

	// Verifica si el usuario ya está inscrito en esa actividad
	var count int64
	err := db.DB.
		Model(&model.Inscription{}).
		Where("user_id = ? AND activity_id = ?", userID, input.ActivityID).
		Count(&count).Error
	if err != nil {
		return fmt.Errorf("error validando inscripción existente: %w", err)
	}
	if count > 0 {
		return fmt.Errorf("ya estás inscrito en esta actividad") // Evita inscripciones duplicadas
	}

	// Valida si hay cupo disponible para la actividad
	activity, err := GetActivityByID(input.ActivityID)
	if err != nil {
		return fmt.Errorf("Actividad no encontrada")
	}
	if len(activity.Inscriptions) >= activity.Quota {
		return fmt.Errorf("El cupo de la actividad está completo")
	}

	// Crea la nueva inscripción con la fecha actual
	newInscription := model.Inscription{
		UserID:           userID,
		ActivityID:       input.ActivityID,
		RegistrationDate: time.Now().Format("2006-01-02"),
	}

	// Llama al cliente para guardar en la base de datos
	if err := inscription.CreateInscription(&newInscription); err != nil {
		return fmt.Errorf("error al registrar inscripción: %w", err)
	}

	return nil
}

func GetMyActivities(userID int) ([]dto.ActivityInscription, error) {
	// Consulta las inscripciones del usuario
	activities, err := inscription.GetInscriptionsByUserID(userID)
	if err != nil {
		return nil, err
	}

	var result []dto.ActivityInscription
	for _, act := range activities {
		// Convierte cada inscripción a un DTO reducido para mostrar
		result = append(result, dto.ActivityInscription{
			ActivityID: act.ID,
			Title:      act.Name,
			Day:        act.Date,
			Instructor: act.Profesor,
		})
	}

	return result, nil
}

type InscriptionService struct {
	DB *gorm.DB // Inyección de dependencia: instancia de GORM
}
