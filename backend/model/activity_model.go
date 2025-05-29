package model

type Activity struct {
	ID           int           `gorm:"primaryKey;autoIncrement"`
	Name         string        `gorm:"type:varchar(100);not null"`
	Description  string        `gorm:"type:varchar(300);not null"`
	Category     string        `gorm:"type:varchar(50);not null"`
	Date         string        `gorm:"type:date;not null"` // format: "yyyy-mm-dd"
	Duration     int           `gorm:"not null"`
	Quota        int           `gorm:"not null"`
	Profesor     string        `gorm:"type:varchar(100);not null"`
	Inscriptions []Inscription `gorm:"foreignKey:ActivityID"`
}
