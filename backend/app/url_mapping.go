package app

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Use(utils.CORS)

	// Login
	router.POST("/login", controllers.Login) //anda
	// Register
	router.POST("/register", controllers.RegisterUser) //anda

	// Usuario
	router.GET("/usuario", utils.AuthMiddleware(), controllers.GetAuthenticatedUser)              //anda
	router.GET("/usuario/:id/actividades", utils.AuthMiddleware(), controllers.GetUserActivities) //anda

	// Actividades
	router.GET("/actividades", controllers.GetAllActivities)    //anda
	router.GET("/actividades/:id", controllers.GetActivityByID) //anda
	router.POST("/actividades", controllers.CreateActivity)     //anda
	router.PUT("/actividades/:id", controllers.UpdateActivity)
	router.DELETE("/actividades/:id", controllers.DeleteActivity)

	// Inscripciones
	router.POST("/inscripciones", utils.AuthMiddleware(), controllers.RegisterInscription) //anda

}
