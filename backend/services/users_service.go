package services

import (
	userClient "backend/clients/user" // alias para evitar conflictos
	"backend/db"
	"backend/dto"
	"backend/model"
	"backend/utils"
	"errors"
	"fmt"
)

// Login realiza la autenticación del usuario y devuelve token
func Login(email string, password string) (int, string, string, string, error) {
	var user model.User
	result := db.DB.First(&user, "email = ?", email) // Busca el usuario por email
	if result.Error != nil {
		return 0, "", "", "", fmt.Errorf("usuario no encontrado")
	}

	// Verifica que el hash de la contraseña coincida
	if utils.HashSHA256(password) != user.Password {
		return 0, "", "", "", fmt.Errorf("password inválido")
	}

	// Genera el token JWT incluyendo el ID y rol
	token, err := utils.GenerateJWT(user.ID, user.Role)
	if err != nil {
		return 0, "", "", "", fmt.Errorf("error generando token: %w", err)
	}

	fullName := user.FirstName + " " + user.LastName
	return user.ID, token, fullName, user.Role, nil // Devuelve: ID, token, nombre completo y rol
}

// RegisterUser crea un nuevo usuario si el email no existe
func RegisterUser(req dto.RegisterRequest) (dto.RegisterResponse, error) {
	// Verifica si el email ya está registrado
	_, err := userClient.GetUserByEmail(req.Email)
	if err == nil {
		return dto.RegisterResponse{}, errors.New("el usuario ya existe")
	}

	// No permite registrar emails reservados para administradores
	adminEmails := []string{"admin@admin.com", "vice@admin.com", "test@admin.com"}
	for _, adminEmail := range adminEmails {
		if req.Email == adminEmail {
			return dto.RegisterResponse{}, errors.New("no se puede registrar con un email de administrador")
		}
	}

	// Crea el objeto de usuario con contraseña hasheada
	user := model.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  utils.HashSHA256(req.Password),
		Role:      "socio", // Siempre se registra como socio
	}

	// Inserta el nuevo usuario en la base
	err = userClient.CreateUser(&user)
	if err != nil {
		return dto.RegisterResponse{}, errors.New("error al crear el usuario")
	}

	// Devuelve un DTO con el ID y nombre del nuevo usuario
	return dto.RegisterResponse{
		UserID: int(user.ID),
		Name:   user.FirstName + " " + user.LastName,
	}, nil
}

// GetUserByID devuelve el modelo de usuario según su ID
func GetUserByID(userID int) (model.User, error) {
	var user model.User
	result := db.DB.First(&user, userID) // Busca el usuario por ID
	if result.Error != nil {
		return model.User{}, fmt.Errorf("error fetching user: %w", result.Error)
	}
	return user, nil
}

// GetUserActivities devuelve todas las actividades a las que está inscrito un usuario
func GetUserActivities(id int) ([]dto.Activity, error) {
	// Llama al cliente que devuelve las actividades como modelos
	activityModels, err := userClient.GetUserActivities(uint(id))
	if err != nil {
		return nil, err
	}

	// Convierte las actividades a DTOs para el frontend
	var activityDTOs []dto.Activity
	for _, act := range activityModels {
		activityDTOs = append(activityDTOs, dto.Activity{
			ID:          act.ID,
			Name:        act.Name,
			Description: act.Description,
			Category:    act.Category,
			Date:        act.Date,
			Duration:    act.Duration,
			Quota:       act.Quota,
			Profesor:    act.Profesor,
		})
	}

	return activityDTOs, nil
}
