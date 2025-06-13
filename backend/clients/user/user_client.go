package user

import (
	"backend/db"    // Conexión principal a la base de datos usando GORM
	"backend/model" // Modelos de datos (User, Activity, etc.)

	"gorm.io/gorm" // Librería GORM para ORM en Go
)

// Variable local para almacenar una referencia a la base de datos
var Db *gorm.DB

// Permite establecer la instancia de base de datos (usado principalmente en tests o inicialización)
func SetDatabase(database *gorm.DB) {
	Db = database
}

// Buscar usuario por ID (uint)
func GetUserByID(id uint) (*model.User, error) {
	var user model.User              // Variable para almacenar el usuario
	result := db.DB.First(&user, id) // Busca el usuario en la base usando el ID
	return &user, result.Error       // Devuelve puntero al usuario y error (si hubo)
}

// Crear un nuevo usuario en la base de datos
func CreateUser(user *model.User) error {
	return Db.Create(user).Error // Usa la instancia Db para crear el usuario y devuelve el error si falla
}

// Buscar usuario por email (único)
func GetUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := Db.Where("email = ?", email).First(&user).Error // Consulta por email usando cláusula WHERE
	if err != nil {
		return nil, err // Si no lo encuentra, devuelve error
	}
	return &user, nil // Si lo encuentra, devuelve el puntero al usuario
}

// Buscar usuario por nombre de usuario
func GetUserByUsername(username string) (model.User, error) {
	var user model.User
	result := db.DB.First(&user, "username = ?", username) // Busca el usuario con username exacto
	return user, result.Error                              // Devuelve el objeto y el error (si hubo)
}

// Eliminar usuario por ID
func DeleteUser(id uint) error {
	result := db.DB.Delete(&model.User{}, id) // Ejecuta DELETE en la tabla users para ese ID
	return result.Error                       // Devuelve error si ocurre
}

// Obtener actividades en las que un usuario está inscrito
func GetUserActivities(userID uint) ([]model.Activity, error) {
	var user model.User

	// Busca el usuario por ID y carga las inscripciones junto con la información de cada actividad asociada
	if err := db.DB.Preload("Inscriptions.Activity").First(&user, userID).Error; err != nil {
		return nil, err // Devuelve error si no encuentra el usuario o no puede cargar relaciones
	}

	var activities []model.Activity
	for _, insc := range user.Inscriptions {
		activities = append(activities, insc.Activity) // Agrega cada actividad asociada a una inscripción
	}

	return activities, nil // Devuelve lista de actividades del usuario
}
