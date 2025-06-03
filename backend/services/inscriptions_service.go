package services

import (
	"backend/clients/inscription"
	"backend/dto"
	"backend/model"
	"fmt"
	"time"
)

func RegisterInscription(userID int, input dto.RegisterInscriptionRequest) error {
	if input.ActivityID <= 0 {
		return fmt.Errorf("ID de actividad inválido")
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
