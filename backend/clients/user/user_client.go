package user

import (
	"backend/db"
	"backend/model"

	"gorm.io/gorm"
)

var Db *gorm.DB

func SetDatabase(database *gorm.DB) {
	Db = database
}

func GetUserByID(id uint) (*model.User, error) {
	var user model.User
	result := db.DB.First(&user, id)
	return &user, result.Error
}

func CreateUser(user *model.User) error {
	return Db.Create(user).Error
}
func GetUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := Db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByUsername(username string) (model.User, error) {
	var user model.User
	result := db.DB.First(&user, "username = ?", username)
	return user, result.Error
}

func DeleteUser(id uint) error {
	result := db.DB.Delete(&model.User{}, id)
	return result.Error
}

// Obtener actividades de un usuario por ID (inscripciones + actividades)
func GetUserActivities(userID int) ([]model.Activity, error) {
	var user model.User
	result := db.DB.Preload("Inscriptions.Activity").First(&user, userID)
	if result.Error != nil {
		return nil, result.Error
	}

	var activities []model.Activity
	for _, ins := range user.Inscriptions {
		activities = append(activities, ins.Activity)
	}

	return activities, nil
}
