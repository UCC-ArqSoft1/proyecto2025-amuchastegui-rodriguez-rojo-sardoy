package main

import (
	"backend/controllers"
	"backend/db"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	// Inicializar base de datos (ya carga el .env)
	db.InitDB()

	// Crear router
	router := gin.Default()

	// Middleware CORS
	router.Use(utils.CORS)

	// Rutas del sistema
	router.POST("/login", controllers.Login)

	// Usuarios
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

	// Iniciar servidor
	router.Run(":8080")
}
