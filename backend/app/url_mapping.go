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
	router.GET("/usuario", utils.AuthMiddleware(), controllers.GetAuthenticatedUser)
	router.GET("/usuario/:id/actividades", utils.AuthMiddleware(), controllers.GetUserActivities)

	// Actividades
	router.GET("/actividades", controllers.GetAllActivities)
	router.GET("/actividades/:id", controllers.GetActivityByID)
	router.POST("/actividades", utils.AuthMiddleware(), controllers.CreateActivity)
	router.PUT("/actividades/:id", utils.AuthMiddleware(), controllers.UpdateActivity)
	router.DELETE("/actividades/:id", utils.AuthMiddleware(), controllers.DeleteActivity)
	// Inscripciones
	router.POST("/inscripciones", utils.AuthMiddleware(), controllers.RegisterInscription)
	router.GET("/my-activities", utils.AuthMiddleware(), controllers.GetMyActivities)

}
