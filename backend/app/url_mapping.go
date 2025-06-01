package app

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Use(utils.CORS) //Ver si agregar esto o no

	// Login
	router.POST("/login", controllers.Login)

	// Usuario
	router.GET("/usuario", controllers.GetUserByID) // Devuelve datos básicos del usuario autenticado
	router.GET("/usuario/:id/actividades", controllers.GetUserActivities)

	// Actividades
	router.GET("/actividades", controllers.GetAllActivities)
	router.GET("/actividades/:id", controllers.GetActivityByID)
	router.POST("/actividades", controllers.CreateActivity)
	router.PUT("/actividades/:id", controllers.UpdateActivity)
	router.DELETE("/actividades/:id", controllers.DeleteActivity)

	// Inscripciones
	router.POST("/inscribirse", controllers.RegisterInscription)
	router.GET("/mis-actividades", controllers.GetMyActivities)
}
