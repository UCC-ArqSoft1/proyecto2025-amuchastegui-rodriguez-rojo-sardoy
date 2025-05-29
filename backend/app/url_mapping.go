package app

import (
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Use(utils.CORS) //Ver si agregar esto o no

	// Login
	router.POST("/login", Login)

	// Usuario
	router.GET("/usuario", GetUser) // Devuelve datos básicos del usuario autenticado
	router.GET("/usuario/:id/actividades", GetActivitiesUser)

	// Actividades
	router.GET("/actividades", GetAllActivities)
	router.GET("/actividades/:id", GetActivityByID)
	router.POST("/actividades", CreateActivity)
	router.PUT("/actividades/:id", UpdateActivity)
	router.DELETE("/actividades/:id", DeleteActivity)

	// Inscripciones
	router.POST("/inscribirse", Inscription)
	router.GET("/mis-actividades", GetMyActivities)
}
