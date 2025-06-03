package dto

type RegisterInscriptionRequest struct {
	ActivityID int `json:"actividad_id"`
}
type Inscription struct {
	ID               int    `json:"id"`
	UserID           int    `json:"user_id"`
	ActivityID       int    `json:"activity_id"`
	RegistrationDate string `json:"registration_date"`
}
