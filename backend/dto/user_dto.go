package dto

type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role"`  // "member" or "admin"
	Phone     int    `json:"phone"` // Optional
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

type RegisterRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Phone     *int   `json:"phone"` // opcional
	Role      string `json:"role"`  // opcional
}

type RegisterResponse struct {
	Message string `json:"message"`
	UserID  int    `json:"user_id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Role    string `json:"role"`
}
