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
	router.GET("/usuario", GetUsuario) // Devuelve datos básicos del usuario autenticado
	router.GET("/usuario/:id/actividades", GetActividadesUsuario)

	// Actividades
	router.GET("/actividades", GetAllActividades)
	router.GET("/actividades/:id", GetActividadByID)
	router.POST("/actividades", CreateActividad)
	router.PUT("/actividades/:id", UpdateActividad)
	router.DELETE("/actividades/:id", DeleteActividad)

	// Inscripciones
	router.POST("/inscribirse", Inscribirse)
	router.GET("/mis-actividades", GetMisActividades)
}
