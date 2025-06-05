package controllers

import (
	"backend/dto"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterInscription(c *gin.Context) {
	// 1. Obtener userID desde el contexto (ya es int)
	userIDValue, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	userID, ok := userIDValue.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al leer userID del token"})
		return
	}

	// 2. Bind del JSON de la request
	var input dto.RegisterInscriptionRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido", "details": err.Error()})
		return
	}

	// 3. Llamar al servicio
	if err := services.RegisterInscription(userID, input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 4. Éxito
	c.JSON(http.StatusCreated, gin.H{"message": "Inscripción registrada con éxito"})
}

func GetMyActivities(ctx *gin.Context) {
	userIDRaw, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	userID, ok := userIDRaw.(int)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	activities, err := services.GetMyActivities(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "4xx. Failed to fetch enrolled activities"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":    "Successfully retrieved enrolled activities",
		"activities": activities,
	})
}
