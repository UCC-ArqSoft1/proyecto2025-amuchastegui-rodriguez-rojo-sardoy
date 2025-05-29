package services

import (
	"backend/clients/activity"
	"backend/dto"
)

func GetActivityByID(id int) (dto.Activity, error) {
	dbActivity, err := activity.GetActivityByID(id)
	if err != nil {
		return dto.Activity{}, err
	}

	var inscriptionDTOs []dto.Inscription
	for _, ins := range dbActivity.Inscriptions {
		inscriptionDTOs = append(inscriptionDTOs, dto.Inscription{
			ID:               ins.ID,
			UserID:           ins.UserID,
			ActivityID:       ins.ActivityID,
			RegistrationDate: ins.RegistrationDate,
		})
	}

	activityDTO := dto.Activity{
		ID:           dbActivity.ID,
		Name:         dbActivity.Name,
		Description:  dbActivity.Description,
		Category:     dbActivity.Category,
		Date:         dbActivity.Date,
		Duration:     dbActivity.Duration,
		Quota:        dbActivity.Quota,
		Profesor:     dbActivity.Profesor,
		Inscriptions: inscriptionDTOs,
	}

	return activityDTO, nil
}
