package model

type Inscription struct {
	ID               int      `gorm:"primaryKey;autoIncrement"`
	UserID           int      `gorm:"not null;index"`
	ActivityID       int      `gorm:"not null;index"`
	Activity         Activity `gorm:"foreignKey:ActivityID"`
	RegistrationDate string   `gorm:"type:date;not null"`
}
