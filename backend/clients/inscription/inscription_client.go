package inscription

import (
	"backend/clients"
	"backend/model"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetInscriptionsByUserID(userID int) ([]model.Inscription, error) {
	var inscriptions []model.Inscription
	result := clients.DB.Where("user_id = ?", userID).Find(&inscriptions)
	return inscriptions, result.Error
}

func CreateInscription(i *model.Inscription) error {
	return clients.DB.Create(i).Error
}
