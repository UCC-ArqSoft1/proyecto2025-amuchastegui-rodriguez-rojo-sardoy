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
	err := activity.CreateActivity(activityData)
	if err != nil {
		return dto.Activity{}, err
	}

	activityDTO := dto.Activity{
		ID:          activityData.ID,
		Name:        activityData.Name,
		Description: activityData.Description,
		Category:    activityData.Category,
		Date:        activityData.Date,
		Duration:    activityData.Duration,
		Quota:       activityData.Quota,
		Profesor:    activityData.Profesor,
	}
	return activityDTO, nil
}

func UpdateActivity(id int, updatedData *model.Activity) (dto.Activity, error) {
	updatedData.ID = id
	err := activity.UpdateActivity(updatedData)
	if err != nil {
		return dto.Activity{}, err
	}

	activityDTO := dto.Activity{
		ID:          id,
		Name:        updatedData.Name,
		Description: updatedData.Description,
		Category:    updatedData.Category,
		Date:        updatedData.Date,
		Duration:    updatedData.Duration,
		Quota:       updatedData.Quota,
		Profesor:    updatedData.Profesor,
	}
	return activityDTO, nil
}

func DeleteActivity(id int) error {
	return activity.DeleteActivity(uint(id))
}
