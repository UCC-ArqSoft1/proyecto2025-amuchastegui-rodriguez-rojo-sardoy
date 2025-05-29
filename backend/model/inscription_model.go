package model

type Inscripcion struct {
	ID               int    `gorm:"primaryKey;autoIncrement"`
	UsuarioID        int    `gorm:"not null;index;foreignKey:UsuarioID"`
	ActividadID      int    `gorm:"not null;index;foreignKey:ActividadID"`
	FechaInscripcion string `gorm:"type:date;not null"` // formato "yyyy-mm-dd"
	Active           bool   `gorm:"default:true"`
}
