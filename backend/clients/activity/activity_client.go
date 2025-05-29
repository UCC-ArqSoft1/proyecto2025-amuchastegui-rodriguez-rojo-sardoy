package activity

import (
	"backend/clients"
	"backend/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActivityByID(id int) (model.Activity, error) {
	var activities model.Activity

	result := clients.DB.Preload("Inscriptions").First(&activities, id)
	if result.Error != nil {
		log.Error("Error fetching activity: ", result.Error)
		return model.Activity{}, result.Error
	}

	return activities, nil
}

func GetAllActivities() ([]model.Activity, error) {
	var activities []model.Activity
	result := clients.DB.Find(&activities)
	return activities, result.Error
}

func CreateActivity(a *model.Activity) error {
	return clients.DB.Create(a).Error
}

func UpdateActivity(a *model.Activity) error {
	return clients.DB.Save(a).Error
}

func DeleteActivity(id int) error {
	return clients.DB.Delete(&model.Activity{}, id).Error
}
