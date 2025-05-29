package models

type Usuario struct {
	ID       int    `gorm:"primaryKey;autoIncrement"`
	Nombre   string `gorm:"type:varchar(100);not null"`
	Apellido string `gorm:"type:varchar(100);not null"`
	Email    string `gorm:"unique;not null;type:varchar(100)"`
	Password string `gorm:"type:longtext;not null"`
	Rol      string `gorm:"type:varchar(20);not null"`
	Telefono int    `gorm:"type:int"`
}
