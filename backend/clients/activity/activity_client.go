package activity

import (
	"backend/clients"
	"backend/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActividadById(id int) model.Actividad {
	var actividad model.Actividad

	Db.Where("id = ?", id).Preload("Categoria").First(&actividad)
	log.Debug("Act: ", actividad)

	return actividad
}

func GetAllActividades() ([]model.Actividad, error) {
	var actividades []model.Actividad
	result := clients.DB.Find(&actividades)
	return actividades, result.Error
}

func CreateActividad(a *model.Actividad) error {
	return clients.DB.Create(a).Error
}

func UpdateActividad(a *model.Actividad) error {
	return clients.DB.Save(a).Error
}

func DeleteActividad(id int) error {
	return clients.DB.Delete(&model.Actividad{}, id).Error
}
