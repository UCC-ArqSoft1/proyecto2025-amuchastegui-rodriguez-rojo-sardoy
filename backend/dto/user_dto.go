package domain

type Usuario struct {
	ID       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Rol      string `json:"rol"`      // "socio" o "admin"
	Telefono int    `json:"telefono"` // Opcional
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	UserID int    `json:"user_id"`
	Token  string `json:"token"`
	Name   string `json:"name"`
}
