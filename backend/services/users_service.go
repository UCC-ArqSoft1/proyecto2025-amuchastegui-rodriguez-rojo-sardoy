package services

import (
	clients "backend/clients/user"
	userClient "backend/clients/user"
	"backend/db"
	"backend/dto"
	"backend/model"
	"backend/utils"
	"errors"
	"fmt"
)

func Login(email string, password string) (int, string, string, error) {
	var user model.User
	result := db.DB.First(&user, "email = ?", email)
	if result.Error != nil {
		return 0, "", "", fmt.Errorf("usuario no encontrado")
	}

	if utils.HashSHA256(password) != user.Password {
		return 0, "", "", fmt.Errorf("password inválido")
	}

	token, err := utils.GenerateJWT(user.ID, user.Role)

	if err != nil {
		return 0, "", "", fmt.Errorf("error generando token: %w", err)
	}

	fullName := user.FirstName + " " + user.LastName
	return user.ID, token, fullName, nil
}

func RegisterUser(req dto.RegisterRequest) (dto.RegisterResponse, error) {
	// Verificar que no exista el email
	_, err := clients.GetUserByEmail(req.Email)
	if err == nil {
		return dto.RegisterResponse{}, errors.New("el usuario ya existe")
	}

	user := model.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  utils.HashSHA256(req.Password),
		Role:      "socio",
	}

	err = clients.CreateUser(&user)
	if err != nil {
		return dto.RegisterResponse{}, errors.New("error al crear el usuario")
	}

	return dto.RegisterResponse{
		UserID: int(user.ID),
		Name:   user.FirstName + " " + user.LastName,
	}, nil
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
