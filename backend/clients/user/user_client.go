package user

import (
	"backend/clients"
	"backend/model"
)

func GetUserByUsername(username string) (model.Usuario, error) {
	var user model.Usuario
	result := clients.DB.First(&user, "username = ?", username)
	return user, result.Error
}

func CreateUser(user *model.Usuario) error {
	return clients.DB.Create(user).Error
}
