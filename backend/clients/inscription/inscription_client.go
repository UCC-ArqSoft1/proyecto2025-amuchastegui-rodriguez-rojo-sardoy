package inscription

import (
	"backend/db"
	"backend/model"
)

// Crea la inscripción en la base de datos
func CreateInscription(ins *model.Inscription) error {
	return db.DB.Create(ins).Error
}
