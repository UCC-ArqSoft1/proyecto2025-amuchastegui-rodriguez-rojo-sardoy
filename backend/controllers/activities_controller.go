package controllers

import (
	"backend/model"
	"backend/services"
	"net/http"
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
	roleRaw, exists := ctx.Get("role") // Extrae el rol del usuario autenticado
	role, ok := roleRaw.(string)       // Asegura que el valor sea string
	if !exists || !ok || role != "admin" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Only admins can create activities"}) // Si no es admin, responde 403
		return
	}

	var newActivity model.Activity
	if err := ctx.ShouldBindJSON(&newActivity); err != nil { // Intenta parsear el cuerpo JSON a la estructura de actividad
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"}) // Si falla, responde 400
		return
	}

	_, err := services.CreateActivity(&newActivity) // Llama al servicio para crear la actividad
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create activity"}) // Si falla en DB, responde 500
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"message": "Activity created successfully"}) // Devuelve mensaje de éxito (201)
}

// Actualizar una actividad existente (solo admins)
func UpdateActivity(ctx *gin.Context) {
	roleRaw, exists := ctx.Get("role")
	role, ok := roleRaw.(string)
	if !exists || !ok || role != "admin" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Only admins can update activities"}) // Solo admin puede modificar
		return
	}

	id := ctx.Param("id") // Toma el ID de la URL
	activityID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"}) // Error si el ID no es numérico
		return
	}

	var updatedData model.Activity
	if err := ctx.ShouldBindJSON(&updatedData); err != nil { // Intenta parsear los datos JSON del body
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"}) // Error si fallan los datos
		return
	}

	_, err = services.UpdateActivity(activityID, &updatedData) // Llama al servicio para actualizar la actividad
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update activity"}) // Error en base de datos
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Activity updated successfully"}) // OK si se actualizó
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
