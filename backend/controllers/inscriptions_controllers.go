package controllers

import (
	"backend/dto"      // Importa estructuras de transferencia de datos (DTO)
	"backend/services" // Importa la lógica de negocio (servicios)
	"net/http"         // Módulo estándar para manejar códigos de respuesta HTTP
	"strconv"          // Importa el paquete para convertir strings a int

	"github.com/gin-gonic/gin" // Framework web Gin
)

// Handler para registrar una nueva inscripción
func RegisterInscription(c *gin.Context) {
	// Obtiene el userID desde el token JWT procesado por el middleware
	userIDValue, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"}) // Error 401 si no hay userID en contexto
		return
	}

	userID, ok := userIDValue.(int) // Intenta convertir el userID a tipo int
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al leer userID del token"}) // Error interno si falla el casteo
		return
	}

	// Parseo del cuerpo JSON a la estructura DTO correspondiente
	var input dto.RegisterInscriptionRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido", "details": err.Error()}) // Error 400 si el cuerpo es inválido
		return
	}

	// Llama al servicio para registrar la inscripción
	if err := services.RegisterInscription(userID, input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}) // Devuelve error interno si algo falla en el servicio
		return
	}

	// Si todo fue exitoso, devuelve 201 con mensaje de éxito
	c.JSON(http.StatusCreated, gin.H{"message": "Inscripción registrada con éxito"})
}

// Handler para obtener las actividades en las que el usuario actual está inscrito
func GetMyActivities(ctx *gin.Context) {
	userIDRaw, exists := ctx.Get("userID") // Obtiene el userID desde el token
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"}) // Si no existe, responde 401
		return
	}

	userID, ok := userIDRaw.(int) // Castea el userID a tipo int
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"}) // Si falla el casteo, responde 400
		return
	}

	activities, err := services.GetMyActivities(userID) // Llama al servicio que devuelve las actividades del usuario
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "4xx. Failed to fetch enrolled activities"}) // Devuelve error si falla la consulta
		return
	}

	// Respuesta exitosa con código 200 y lista de actividades
	ctx.JSON(http.StatusOK, gin.H{
		"message":    "Successfully retrieved enrolled activities",
		"activities": activities,
	})
}

// Handler para desinscribirse de una actividad
func UnsubscribeFromActivity(c *gin.Context) {
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
	activityIDParam := c.Param("id")
	activityID, err := strconv.Atoi(activityIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de actividad inválido"})
		return
	}
	if err := services.UnsubscribeFromActivity(userID, activityID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Desinscripción exitosa"})
}

// Definición de controlador estructurado (no usado explícitamente acá, pero útil para inyección de dependencias si se extiende)
type InscriptionController struct {
	Service *services.InscriptionService // Referencia a la capa de servicio, inyectable
}
