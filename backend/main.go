package main

import (
	"backend/app"
	userClient "backend/clients/user"
	"backend/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// Iniciar base de datos
	db.InitDB()
	userClient.SetDatabase(db.DB)
	// Crear router
	router := gin.Default()

	// Servir archivos estáticos de la carpeta uploads
	router.Static("/uploads", "./uploads")

	// Registrar todas las rutas (y middlewares)
	app.RegisterRoutes(router)

	// Iniciar servidor
	router.Run(":8080")
}
