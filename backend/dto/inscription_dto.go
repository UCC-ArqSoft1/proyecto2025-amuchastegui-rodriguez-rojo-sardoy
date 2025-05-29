package domain

type Inscription struct {
	ID               int    `json:"id"`
	UsuarioID        int    `json:"usuario_id"`
	ActividadID      int    `json:"actividad_id"`
	FechaInscripcion string `json:"fecha_inscripcion"`
	Active           bool   `json:"activa"`
}

type InscriptionRequest struct {
	UsuarioID   int `json:"usuario_id"`
	ActividadID int `json:"actividad_id"`
}

type InscriptionResponse struct {
	InscriptionID    int    `json:"inscription_id"`
	UsuarioID        int    `json:"usuario_id"`
	ActividadID      int    `json:"actividad_id"`
	FechaInscripcion string `json:"fecha_inscripcion"`
	Active           bool   `json:"activa"`
}
