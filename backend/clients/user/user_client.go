package user

import (
	"backend/db"
	"backend/model"

	"gorm.io/gorm"
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

func GetUserByUsername(username string) (model.User, error) {
	var user model.User
	result := db.DB.First(&user, "username = ?", username)
	return user, result.Error
}

func DeleteUser(id uint) error {
	result := db.DB.Delete(&model.User{}, id)
	return result.Error
}

func GetUserActivities(userID uint) ([]model.Activity, error) {
	var user model.User

	// Preload el nombre correcto del campo: Inscriptions
	result := db.DB.Preload("Inscriptions.Activity").First(&user, userID)
	if result.Error != nil {
		return nil, result.Error
	}

	var activities []model.Activity
	for _, insc := range user.Inscriptions {
		activities = append(activities, insc.Activity)
	}

	if len(activities) == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	return activities, nil
}
