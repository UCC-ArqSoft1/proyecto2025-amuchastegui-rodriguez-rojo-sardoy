package domain

type Actividad struct {
	ID          int    `json:"id"`
	Nombre      string `json:"nombre"`
	Descripcion string `json:"descripcion"`
	Categoria   string `json:"categoria"`
	Dia         string `json:"dia"`      // formato: "dd/mm/yyyy"
	Duracion    int    `json:"duracion"` // en minutos
	Cupo        int    `json:"cupo"`
	Profesor    string `json:"profesor"`
}
