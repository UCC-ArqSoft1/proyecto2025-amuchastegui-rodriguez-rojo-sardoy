package domain

type Actividad struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Date        string `json:"date"`     // formato: "dd/mm/yyyy"
	Duration    int    `json:"duration"` // en minutos
	Quota       int    `json:"quota"`
	Profesor    string `json:"profesor"`
}
