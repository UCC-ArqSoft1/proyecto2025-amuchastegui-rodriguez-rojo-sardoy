package controllers

import (
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
	idParam := ctx.Query("id")
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
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
	// 1. Obtener el parámetro de la URL
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	// 2. Llamar al servicio
	activities, err := services.GetUserActivities(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener actividades del usuario"})
		return
	}

	// 3. Responder con JSON
	c.JSON(http.StatusOK, activities)
}
