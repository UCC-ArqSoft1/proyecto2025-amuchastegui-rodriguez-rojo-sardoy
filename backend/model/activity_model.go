package model

type Activity struct {
	ID           int           `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string        `gorm:"type:varchar(100);not null" json:"name"`
	Description  string        `gorm:"type:varchar(300);not null" json:"description"`
	Category     string        `gorm:"type:varchar(50);not null" json:"category"`
	Date         string        `gorm:"type:date;not null" json:"date"` // formato YYYY-MM-DD
	Duration     int           `gorm:"not null" json:"duration"`
	Quota        int           `gorm:"not null" json:"quota"`
	Profesor     string        `gorm:"type:varchar(100);not null" json:"profesor"`
	Inscriptions []Inscription `gorm:"foreignKey:ActivityID;constraint:OnDelete:CASCADE;" json:"inscriptions,omitempty"`
}
