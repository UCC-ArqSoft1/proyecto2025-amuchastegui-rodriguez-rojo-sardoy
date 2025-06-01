package model

type User struct {
	ID           int           `gorm:"primaryKey;autoIncrement"`
	FirstName    string        `gorm:"type:varchar(100);not null"`
	LastName     string        `gorm:"type:varchar(100);not null"`
	Email        string        `gorm:"unique;not null;type:varchar(100)"`
	Password     string        `gorm:"type:longtext;not null"`
	Role         string        `gorm:"type:varchar(20);not null"`
	Phone        int           `gorm:"type:int"`
	Inscriptions []Inscription `gorm:"foreignKey:UserID"`
}
