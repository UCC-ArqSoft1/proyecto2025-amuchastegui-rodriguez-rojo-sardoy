package services

import (
	"backend/clients/activity"
	"backend/db"
	"backend/dto"
	"backend/model"
	"fmt"
)

func GetActivityByID(id int) (dto.Activity, error) {
	dbActivity, err := activity.GetActivityByID(uint(id)) // Busca la actividad en la DB
	if err != nil {
		return dto.Activity{}, err // Devuelve error si no se encuentra
	}

	var inscriptionDTOs []dto.Inscription
	for _, ins := range dbActivity.Inscriptions {
		// Convierte cada inscripción de la actividad a su DTO
		inscriptionDTOs = append(inscriptionDTOs, dto.Inscription{
			ID:               ins.ID,
			UserID:           ins.UserID,
			ActivityID:       ins.ActivityID,
			RegistrationDate: ins.RegistrationDate,
		})
	}

	// Arma el DTO de actividad para devolver al frontend
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
	dbActivities, err := activity.GetAllActivities() // Trae todas las actividades desde la base
	if err != nil {
		return nil, err
	}

	var activitiesDTO []dto.Activity
	for _, a := range dbActivities {
		// Convierte cada actividad a DTO
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
	// Verifica si ya existe una actividad con el mismo nombre, fecha y profesor
	var existing model.Activity
	err := db.DB.
		Where("name = ? AND date = ? AND profesor = ?", activityData.Name, activityData.Date, activityData.Profesor).
		First(&existing).Error
	if err == nil {
		// Si encuentra una coincidencia, devuelve error de conflicto
		return dto.Activity{}, fmt.Errorf("ya existe una actividad con el mismo nombre, fecha y profesor")
	}

	// Guarda la nueva actividad en la base de datos
	err = activity.CreateActivity(activityData)
	if err != nil {
		return dto.Activity{}, err
	}

	// Devuelve el DTO de la actividad recién creada
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
	updatedData.ID = id                         // Asigna el ID recibido a la estructura
	err := activity.UpdateActivity(updatedData) // Aplica la actualización
	if err != nil {
		return dto.Activity{}, err
	}

	// Devuelve la actividad actualizada en formato DTO
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
	return activity.DeleteActivity(uint(id)) // Llama al repositorio para borrar la actividad
}
