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

type ActivityInscription struct {
	ActivityID int    `json:"activity_id"`
	Title      string `json:"title"`
	Day        string `json:"day"`
	Instructor string `json:"instructor"`
}
