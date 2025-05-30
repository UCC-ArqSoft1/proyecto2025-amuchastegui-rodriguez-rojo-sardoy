package user

import (
	"backend/db"
	"backend/model"
)

func GetUserByID(id uint) (*model.User, error) {
	var user model.User
	result := db.DB.First(&user, id)
	return &user, result.Error
}

func CreateUser(user *model.User) error {
	result := db.DB.Create(user)
	return result.Error
}
func GetUserByUsername(username string) (*model.User, error) {
	var user model.User
	result := db.DB.Where("username = ?", username).First(&user)
	return &user, result.Error
}

func DeleteUser(id uint) error {
	result := db.DB.Delete(&model.User{}, id)
	return result.Error
}
