package app

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Use(utils.CORS)

	// Login
	router.POST("/login", controllers.Login)
	// Register
	router.POST("/register", controllers.RegisterUser)

	// Usuario
	router.GET("/usuario", controllers.GetUserByID)
	router.GET("/usuario/:id/actividades", controllers.GetUserActivities)

	// Actividades
	router.GET("/actividades", controllers.GetAllActivities)
	router.GET("/actividades/:id", controllers.GetActivityByID)
	router.POST("/actividades", controllers.CreateActivity)
	router.PUT("/actividades/:id", controllers.UpdateActivity)
	router.DELETE("/actividades/:id", controllers.DeleteActivity)

	// Inscripciones
	router.POST("/inscripciones", controllers.RegisterInscription)
	router.GET("/mis-actividades", controllers.GetMyActivities)

}
