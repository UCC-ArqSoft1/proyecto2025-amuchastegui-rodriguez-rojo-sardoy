package utils

import "github.com/gin-gonic/gin" // Importa Gin para definir el middleware

// Middleware para habilitar CORS en todas las rutas
func CORS(ctx *gin.Context) {
	// Permite que cualquier origen acceda a la API (uso de "*" significa sin restricciones)
	ctx.Header("Access-Control-Allow-Origin", "*")

	// Define los métodos HTTP permitidos desde otros orígenes
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	// Define los encabezados permitidos en las solicitudes de otros orígenes
	ctx.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// Si la solicitud es de tipo OPTIONS (preflight), responde con 204 y detiene la cadena de middleware
	if ctx.Request.Method == "OPTIONS" {
		ctx.AbortWithStatus(204) // Corta la ejecución y responde sin contenido
		return
	}

	// Si no es OPTIONS, continúa con la siguiente función en la cadena de middlewares
	ctx.Next()
}
