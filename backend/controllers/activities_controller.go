package controllers

import (
	"backend/model"
	"backend/services"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Obtener una actividad por su ID
func GetActivityByID(ctx *gin.Context) {
	id := ctx.Param("id")               // Extrae el parámetro 'id' desde la URL
	activityID, err := strconv.Atoi(id) // Convierte el ID a entero
	if err != nil {
		ctx.String(http.StatusBadRequest, "Invalid ID") // Devuelve error si no es un número válido
		return
	}

	activity, err := services.GetActivityByID(activityID) // Llama al servicio para buscar la actividad por ID
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Activity not found"}) // Si no existe, responde 404
		return
	}
	ctx.JSON(http.StatusOK, activity) // Devuelve la actividad con código 200
}

// Obtener todas las actividades disponibles
func GetAllActivities(ctx *gin.Context) {
	activities, err := services.GetAllActivities() // Llama al servicio que devuelve todas las actividades
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve activities"}) // Si hay error en DB, responde 500
		return
	}
	ctx.JSON(http.StatusOK, activities) // Devuelve lista de actividades con código 200
}

// Crear una nueva actividad (solo admins)
func CreateActivity(ctx *gin.Context) {
	roleRaw, exists := ctx.Get("role")
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Only admins can create activities"})
		return
	}

	var newActivity model.Activity
	// Si el request es multipart/form-data, parsear los campos manualmente
	if ctx.ContentType() == "multipart/form-data" {
		newActivity.Name = ctx.PostForm("name")
		newActivity.Description = ctx.PostForm("description")
		newActivity.Category = ctx.PostForm("category")
		newActivity.Date = ctx.PostForm("date")
		duration, _ := strconv.Atoi(ctx.PostForm("duration"))
		newActivity.Duration = duration
		quota, _ := strconv.Atoi(ctx.PostForm("quota"))
		newActivity.Quota = quota
		newActivity.Profesor = ctx.PostForm("profesor")

		// Manejar archivo de imagen
		file, err := ctx.FormFile("image")
		if err == nil {
			// Crear carpeta uploads si no existe
			os.MkdirAll("uploads", os.ModePerm)
			filename := filepath.Base(file.Filename)
			path := filepath.Join("uploads", filename)
			if err := ctx.SaveUploadedFile(file, path); err == nil {
				newActivity.ImageURL = "/uploads/" + filename
			}
		} else {
			// Si no se sube imagen, usar imagen por defecto
			newActivity.ImageURL = "/uploads/default.jpg"
		}
	} else {
		if err := ctx.ShouldBindJSON(&newActivity); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
			return
		}
	}

	_, err := services.CreateActivity(&newActivity)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create activity"})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"message": "Activity created successfully"})
}

// Actualizar una actividad existente (solo admins)
func UpdateActivity(ctx *gin.Context) {
	roleRaw, exists := ctx.Get("role")
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Only admins can update activities"})
		return
	}

	id := ctx.Param("id")
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updatedData model.Activity
	if ctx.ContentType() == "multipart/form-data" {
		updatedData.Name = ctx.PostForm("name")
		updatedData.Description = ctx.PostForm("description")
		updatedData.Category = ctx.PostForm("category")
		updatedData.Date = ctx.PostForm("date")
		duration, _ := strconv.Atoi(ctx.PostForm("duration"))
		updatedData.Duration = duration
		quota, _ := strconv.Atoi(ctx.PostForm("quota"))
		updatedData.Quota = quota
		updatedData.Profesor = ctx.PostForm("profesor")

		file, err := ctx.FormFile("image")
		if err == nil {
			os.MkdirAll("uploads", os.ModePerm)
			filename := filepath.Base(file.Filename)
			path := filepath.Join("uploads", filename)
			if err := ctx.SaveUploadedFile(file, path); err == nil {
				updatedData.ImageURL = "/uploads/" + filename
			}
		} else {
			// Obtener la actividad actual para conservar la imagen anterior
			current, _ := services.GetActivityByID(activityID)
			if current.ImageURL != "" {
				updatedData.ImageURL = current.ImageURL
			} else {
				updatedData.ImageURL = "/uploads/default.jpg"
			}
		}
	} else {
		if err := ctx.ShouldBindJSON(&updatedData); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
			return
		}
	}

	_, err = services.UpdateActivity(activityID, &updatedData)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update activity"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Activity updated successfully"})
}

// Eliminar una actividad (solo admins)
func DeleteActivity(ctx *gin.Context) {
	roleRaw, exists := ctx.Get("role")
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Only admins can delete activities"}) // Solo admins pueden borrar
		return
	}

	id := ctx.Param("id") // Obtiene el ID de la URL
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"}) // Si no es número, responde 400
		return
	}

	err = services.DeleteActivity(activityID) // Llama al servicio para borrar la actividad
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete activity"}) // Error si falla
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Activity deleted successfully"}) // Devuelve éxito (200)
}
