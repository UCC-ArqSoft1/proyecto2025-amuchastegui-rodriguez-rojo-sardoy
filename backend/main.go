package main

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()

	router.Use(utils.CORS)

	router.POST("/users/login", controllers.Login)
	router.GET("/activities/:id", controllers.GetActivityByID)

	router.Run(":8080")
}
