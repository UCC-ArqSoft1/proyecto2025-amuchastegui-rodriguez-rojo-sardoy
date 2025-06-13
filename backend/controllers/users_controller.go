package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"backend/dto"
	"backend/services"

	"github.com/gin-gonic/gin"
)

func Login(ctx *gin.Context) {
	var request dto.LoginRequest // Estructura para recibir email y password
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Formato de datos inválido"}) // Error si el JSON no es válido
		return
	}

	adminEmails := []string{"admin@admin.com", "vice@admin.com", "test@admin.com"} // Lista de emails de admins
	isAdminEmail := false
	for _, adminEmail := range adminEmails {
		if request.Email == adminEmail {
			isAdminEmail = true // Marca como admin si el email coincide
			break
		}
	}

	userID, token, name, role, err := services.Login(request.Email, request.Password) // Llama al servicio de login
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales incorrectas"}) // Si falla, error 401
		return
	}

	if !isAdminEmail {
		role = "socio" // Si no es admin, fuerza el rol a socio
	}

	ctx.JSON(http.StatusCreated, gin.H{ // Devuelve token y datos del usuario
		"user_id": userID,
		"token":   token,
		"name":    name,
		"role":    role,
		"message": "201. Verificación realizada con éxito",
	})
}

func GetUserByID(ctx *gin.Context) {
	idValue, exists := ctx.Get("userID") // Obtiene el userID del token
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o ausente"}) // Si no hay ID, error 401
		return
	}

	userID, ok := idValue.(int) // Convierte a entero
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "ID de usuario inválido en token"}) // Error si falla conversión
		return
	}

	user, err := services.GetUserByID(userID) // Busca al usuario por ID
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "404. Error de obtención de datos del usuario"}) // Error si no existe
		return
	}

	ctx.JSON(http.StatusOK, gin.H{ // Devuelve los datos del usuario
		"message": "Obtención de datos usuario realizada con éxito",
		"id":      user.ID,
		"name":    user.FirstName + " " + user.LastName,
		"email":   user.Email,
		"rol":     user.Role,
	})
}

func GetUserActivities(c *gin.Context) {
	roleRaw, exists := c.Get("role") // Extrae el rol del usuario autenticado
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Solo administradores pueden acceder a actividades de otros usuarios"}) // Bloquea si no es admin
		return
	}

	idParam := c.Param("id")         // Obtiene el parámetro ID desde la URL
	id, err := strconv.Atoi(idParam) // Convierte a entero
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"}) // Error si no es número
		return
	}

	activities, err := services.GetUserActivities(id) // Llama al servicio para obtener actividades
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener actividades del usuario"}) // Error si falla
		return
	}

	c.JSON(http.StatusOK, activities) // Devuelve las actividades
}

func RegisterUser(ctx *gin.Context) {
	var req dto.RegisterRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"}) // Error si falla el parseo del JSON
		return
	}

	resp, err := services.RegisterUser(req) // Llama al servicio de registro
	if err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"error": err.Error()}) // Si el email ya existe, error 409
		return
	}

	ctx.JSON(http.StatusCreated, resp) // Devuelve el usuario creado
}

func GetAuthenticatedUser(ctx *gin.Context) {
	userIDStr, exists := ctx.Get("userID") // Extrae el userID del token
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"}) // Error si falta el token
		return
	}

	userID, err := strconv.Atoi(fmt.Sprintf("%v", userIDStr)) // Convierte a entero
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"}) // Error si no es un número válido
		return
	}

	user, err := services.GetUserByID(userID) // Busca el usuario
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado"}) // Error si no está en la base
		return
	}

	ctx.JSON(http.StatusOK, gin.H{ // Devuelve sus datos
		"id":    user.ID,
		"name":  user.FirstName + " " + user.LastName,
		"email": user.Email,
		"role":  user.Role,
	})
}
