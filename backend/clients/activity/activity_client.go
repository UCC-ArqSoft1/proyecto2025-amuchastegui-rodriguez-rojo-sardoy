package activity

import (
	"backend/db"
	"backend/model"
)

func GetActivityByID(id uint) (*model.Activity, error) {
	var activity model.Activity
	result := db.DB.First(&activity, id)
	return &activity, result.Error
}

func GetAllActivities() ([]model.Activity, error) {
	var activities []model.Activity
	result := db.DB.Find(&activities)
	return activities, result.Error
}

func CreateActivity(activity *model.Activity) error {
	result := db.DB.Create(activity)
	return result.Error
}

func UpdateActivity(activity *model.Activity) error {
	result := db.DB.Save(activity)
	return result.Error
}

func DeleteActivity(id uint) error {
	result := db.DB.Delete(&model.Activity{}, id)
	return result.Error
}
