package main

import (
	"backend/controllers"
	"backend/db"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	router := gin.New()

	router.Use(utils.CORS)

	router.POST("/users/login", controllers.Login)
	router.GET("/activities/:id", controllers.GetActivityByID)

	router.Run(":8080")
}
