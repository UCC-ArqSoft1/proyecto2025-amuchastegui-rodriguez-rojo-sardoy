package user

import (
	"backend/clients"
	"backend/model"
)

func GetUserByUsername(username string) (model.User, error) {
	var user model.User
	result := clients.DB.First(&user, "username = ?", username)
	return user, result.Error
}

func CreateUser(user *model.User) error {
	return clients.DB.Create(user).Error
}
