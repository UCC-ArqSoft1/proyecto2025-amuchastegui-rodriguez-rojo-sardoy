package model

type Inscription struct {
	ID               int      `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID           int      `gorm:"not null;index" json:"user_id"`
	ActivityID       int      `gorm:"not null;index" json:"activity_id"`
	Activity         Activity `gorm:"foreignKey:ActivityID" json:"activity,omitempty"`
	RegistrationDate string   `gorm:"type:date;not null" json:"registration_date"`
}
