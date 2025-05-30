package services

import (
	"backend/clients/activity"
	"backend/dto"
	"backend/model"
)

func GetActivityByID(id int) (dto.Activity, error) {
	dbActivity, err := activity.GetActivityByID(uint(id))
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

func GetAllActivities() ([]dto.Activity, error) {
	dbActivities, err := activity.GetAllActivities()
	if err != nil {
		return nil, err
	}

	var activitiesDTO []dto.Activity
	for _, a := range dbActivities {
		activityDTO := dto.Activity{
			ID:          a.ID,
			Name:        a.Name,
			Description: a.Description,
			Category:    a.Category,
			Date:        a.Date,
			Duration:    a.Duration,
			Quota:       a.Quota,
			Profesor:    a.Profesor,
		}
		activitiesDTO = append(activitiesDTO, activityDTO)
	}

	return activitiesDTO, nil
}

func CreateActivity(activityData *model.Activity) (dto.Activity, error) {
	dbActivity, err := CreateActivity(activityData)
	if err != nil {
		return dto.Activity{}, err
	}

	activityDTO := dto.Activity{
		ID:          dbActivity.ID,
		Name:        dbActivity.Name,
		Description: dbActivity.Description,
		Category:    dbActivity.Category,
		Date:        dbActivity.Date,
		Duration:    dbActivity.Duration,
		Quota:       dbActivity.Quota,
		Profesor:    dbActivity.Profesor,
	}
	return activityDTO, nil
}

func UpdateActivity(id int, updatedData *model.Activity) (dto.Activity, error) {
	updated, err := UpdateActivity(id, updatedData)
	if err != nil {
		return dto.Activity{}, err
	}

	activityDTO := dto.Activity{
		ID:          updated.ID,
		Name:        updated.Name,
		Description: updated.Description,
		Category:    updated.Category,
		Date:        updated.Date,
		Duration:    updated.Duration,
		Quota:       updated.Quota,
		Profesor:    updated.Profesor,
	}
	return activityDTO, nil
}

func DeleteActivity(id int) error {
	return activity.DeleteActivity(uint(id))
}
