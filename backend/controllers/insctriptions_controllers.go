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
