package controllers

import (
	"net/http"

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

	userID, token, nombre, err := services.Login(request.Email, request.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales incorrectas"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"user_id": userID,
		"token":   token,
		"name":    nombre,
		"message": "201. Verificación realizada con éxito",
	})
}
