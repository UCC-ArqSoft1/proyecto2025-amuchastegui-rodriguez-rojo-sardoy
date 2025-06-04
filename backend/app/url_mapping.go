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
	router.GET("/usuario", utils.AuthMiddleware(), controllers.GetAuthenticatedUser)              //probar
	router.GET("/usuario/:id/actividades", utils.AuthMiddleware(), controllers.GetUserActivities) //probar

	// Actividades
	router.GET("/actividades", controllers.GetAllActivities)      //probar
	router.GET("/actividades/:id", controllers.GetActivityByID)   //probar
	router.POST("/actividades", controllers.CreateActivity)       //probar
	router.PUT("/actividades/:id", controllers.UpdateActivity)    //probar
	router.DELETE("/actividades/:id", controllers.DeleteActivity) //probar

	// Inscripciones
	router.POST("/inscripciones", utils.AuthMiddleware(), controllers.RegisterInscription) //probar
}
