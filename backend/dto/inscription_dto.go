package dto

type Inscription struct {
	ID               int    `json:"id"`
	UserID           int    `json:"user_id"`
	ActivityID       int    `json:"activity_id"`
	RegistrationDate string `json:"registration_date"`
}

type InscriptionRequest struct {
	UserID     int `json:"user_id"`
	ActivityID int `json:"activity_id"`
}

type InscriptionResponse struct {
	InscriptionID    int    `json:"inscription_id"`
	UserID           int    `json:"user_id"`
	ActivityID       int    `json:"activity_id"`
	RegistrationDate string `json:"registration_date"`
}
