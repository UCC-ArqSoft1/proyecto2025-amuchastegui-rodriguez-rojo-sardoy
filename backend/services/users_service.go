package services

import (
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

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		return 0, "", "", fmt.Errorf("error generando token: %w", err)
	}

	fullName := user.FirstName + " " + user.LastName
	return user.ID, token, fullName, nil
}

// RegisterUser crea un nuevo usuario si el email no está en uso
func RegisterUser(req dto.RegisterRequest) error {
	// Verificamos si ya existe un usuario con ese email
	var existing model.User
	if err := db.DB.Where("email = ?", req.Email).First(&existing).Error; err == nil {
		return errors.New("el usuario ya existe")
	}

	// Crear el nuevo usuario con rol "socio" por defecto
	user := model.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  utils.HashSHA256(req.Password),
		Role:      "socio",
	}

	// Guardar el nuevo usuario en la base de datos
	if err := db.DB.Create(&user).Error; err != nil {
		return errors.New("no se pudo crear el usuario")
	}
	return nil
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
