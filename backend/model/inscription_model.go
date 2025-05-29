package model

type Inscription struct {
	ID               int    `gorm:"primaryKey;autoIncrement"`
	UserID           int    `gorm:"not null;index;foreignKey:UserID"`
	ActivityID       int    `gorm:"not null;index;foreignKey:ActivityID"`
	RegistrationDate string `gorm:"type:date;not null"` // format: "yyyy-mm-dd"
	Active           bool   `gorm:"default:true"`
}
