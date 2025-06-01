package controllers

import (
	"backend/dto"
	"backend/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RegisterInscription(ctx *gin.Context) {
	var request dto.RegisterInscriptionRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Formato de datos inválido"})
		return
	}

	err := services.RegisterInscription(request.UsuarioID, request.ActividadID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Inscripción realizada con éxito"})
}

func GetMyActivities(ctx *gin.Context) {
	userIDStr := ctx.Query("user_id")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil || userID <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}

	activities, err := services.GetActivitiesByUser(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch activities"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":    "User activities retrieved successfully",
		"activities": activities,
	})
}
