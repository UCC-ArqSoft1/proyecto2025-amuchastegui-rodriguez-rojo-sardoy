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
	var request dto.LoginRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Formato de datos inválido"})
		return
	}

	userID, token, name, err := services.Login(request.Email, request.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales incorrectas"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"user_id": userID,
		"token":   token,
		"name":    name,
		"message": "201. Verificación realizada con éxito",
	})
}

func GetUserByID(ctx *gin.Context) {
	// Obtener el userID que el middleware puso en el context
	idValue, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o ausente"})
		return
	}

	userID, ok := idValue.(int)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "ID de usuario inválido en token"})
		return
	}

	user, err := services.GetUserByID(userID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "404. Error de obtención de datos del usuario"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Obtención de datos usuario realizada con éxito",
		"id":      user.ID,
		"name":    user.FirstName + " " + user.LastName,
		"email":   user.Email,
		"rol":     user.Role,
	})
}

func GetUserActivities(c *gin.Context) {
	// Validar rol
	roleRaw, exists := c.Get("role")
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Solo administradores pueden acceder a actividades de otros usuarios"})
		return
	}

	// Continuar si es admin
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	activities, err := services.GetUserActivities(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener actividades del usuario"})
		return
	}

	c.JSON(http.StatusOK, activities)
}

func RegisterUser(ctx *gin.Context) {
	var req dto.RegisterRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	resp, err := services.RegisterUser(req)
	if err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, resp)
}

func GetAuthenticatedUser(ctx *gin.Context) {
	userIDStr, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	userID, err := strconv.Atoi(fmt.Sprintf("%v", userIDStr))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	user, err := services.GetUserByID(userID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"id":    user.ID,
		"name":  user.FirstName + " " + user.LastName,
		"email": user.Email,
		"role":  user.Role,
	})
}
