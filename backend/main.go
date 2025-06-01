package main

import (
	"backend/app"
	"backend/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// Iniciar base de datos
	db.InitDB()

	// Crear router
	router := gin.Default()

	// Registrar todas las rutas (y middlewares)
	app.RegisterRoutes(router)

	// Iniciar servidor
	router.Run(":8080")
}
