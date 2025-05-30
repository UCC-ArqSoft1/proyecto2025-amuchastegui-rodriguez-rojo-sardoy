package inscription

import (
	"backend/db"
	"backend/model"
)

func GetInscriptionByID(id uint) (*model.Inscription, error) {
	var inscription model.Inscription
	result := db.DB.First(&inscription, id)
	return &inscription, result.Error
}

func CreateInscription(inscription *model.Inscription) error {
	result := db.DB.Create(inscription)
	return result.Error
}

func UpdateInscription(inscription *model.Inscription) error {
	result := db.DB.Save(inscription)
	return result.Error
}

func DeleteInscription(id uint) error {
	result := db.DB.Delete(&model.Inscription{}, id)
	return result.Error
}
