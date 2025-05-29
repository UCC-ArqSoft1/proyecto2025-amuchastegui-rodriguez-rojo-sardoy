package inscription

import (
	"backend/clients"
	"backend/model"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetInscripcionesByUserID(userID int) ([]model.Inscripcion, error) {
	var inscripciones []model.Inscripcion
	result := clients.DB.Where("usuario_id = ?", userID).Find(&inscripciones)
	return inscripciones, result.Error
}

func CreateInscripcion(i *model.Inscripcion) error {
	return clients.DB.Create(i).Error
}
