package controllers

import (
	"backend/model"
	"backend/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetActivityByID(ctx *gin.Context) {
	id := ctx.Param("id")
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.String(http.StatusBadRequest, "Invalid ID")
		return
	}

	activity, err := services.GetActivityByID(activityID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Activity not found"})
		return
	}
	ctx.JSON(http.StatusOK, activity)
}

func GetAllActivities(ctx *gin.Context) {
	activities, err := services.GetAllActivities()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve activities"})
		return
	}
	ctx.JSON(http.StatusOK, activities)
}

func CreateActivity(ctx *gin.Context) {
	var newActivity model.Activity
	if err := ctx.ShouldBindJSON(&newActivity); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	err := services.CreateActivity(&newActivity)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create activity"})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"message": "Activity created successfully"})
}

func UpdateActivity(ctx *gin.Context) {
	id := ctx.Param("id")
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updatedData model.Activity
	if err := ctx.ShouldBindJSON(&updatedData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	err = services.UpdateActivity(activityID, &updatedData)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update activity"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Activity updated successfully"})
}

func DeleteActivity(ctx *gin.Context) {
	id := ctx.Param("id")
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	err = services.DeleteActivity(activityID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete activity"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Activity deleted successfully"})
}
