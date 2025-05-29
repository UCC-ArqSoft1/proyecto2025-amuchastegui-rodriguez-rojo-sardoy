package services

import (
	"backend/dto"
)

func GetActividadByID(id int) (Actividad, error) {
	activity, err := GetActividadByID(id)
	if err != nil {
		return dto.Actividad{}, err
	}

	var insDtos []dto.InscriptionDto

	for _, ins := range activity.Inscriptions {
		insDtos = append(insDtos, dto.InscriptionDto{
			ID:              ins.ID,
			UserID:          ins.UserID,
			ActivityID:      ins.ActivityID,
			DateInscription: ins.DateInscription,
			Active:          ins.Active,
		})
	}

	activityDto := dto.Actividad{
		ID:           activity.ID,
		Name:         activity.Name,
		Description:  activity.Description,
		Inscriptions: insDtos,
		// agrega otros campos necesarios aquí
	}

	return activityDto, nil
}
