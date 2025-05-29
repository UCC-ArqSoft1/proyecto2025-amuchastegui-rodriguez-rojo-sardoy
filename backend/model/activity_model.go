package models

type Actividad struct {
	ID          int    `gorm:"primaryKey;autoIncrement"`
	Nombre      string `gorm:"type:varchar(100);not null"`
	Descripcion string `gorm:"type:varchar(300);not null"`
	Categoria   string `gorm:"type:varchar(50);not null"`
	Dia         string `gorm:"type:date;not null"` // formato "yyyy-mm-dd"
	Duracion    int    `gorm:"not null"`
	Cupo        int    `gorm:"not null"`
	Profesor    string `gorm:"type:varchar(100);not null"`
}
