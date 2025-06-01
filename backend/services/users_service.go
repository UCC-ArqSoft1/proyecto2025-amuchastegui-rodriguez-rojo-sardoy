package services

import (
	userClient "backend/clients/user"
	"backend/db"
	"backend/dto"
	"backend/model"
	"backend/utils"
	"fmt"
)

func Login(username string, password string) (int, string, string, error) {
	var user model.User
	result := db.DB.First(&user, "username = ?", username)
	if result.Error != nil {
		return 0, "", "", fmt.Errorf("error getting user: %w", result.Error)
	}

	if utils.HashSHA256(password) != user.Password {
		return 0, "", "", fmt.Errorf("invalid password")
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		return 0, "", "", fmt.Errorf("error generating token: %w", err)
	}

	fullName := user.FirstName + " " + user.LastName
	return user.ID, token, fullName, nil
}

func GetUserByID(userID int) (model.User, error) {
	var user model.User
	result := db.DB.First(&user, userID)
	if result.Error != nil {
		return model.User{}, fmt.Errorf("error fetching user: %w", result.Error)
	}
	return user, nil
}

func GetUserActivities(id int) ([]dto.Activity, error) {
	activityModel, err := userClient.GetUserActivities(uint(id))
	if err != nil {
		return nil, err
	}

	var actDto []dto.Activity
	for _, act := range activityModel {
		actDto = append(actDto, dto.Activity{
			ID:          act.ID,
			Name:        act.Name,
			Description: act.Description,
			Category:    act.Category,
			Date:        act.Date,
			Duration:    act.Duration,
			Quota:       act.Quota,
			Profesor:    act.Profesor,
			// Inscriptions: nil // Solo si realmente querés incluirlas, y necesitas mapearlas también
		})
	}
	return actDto, nil
}
