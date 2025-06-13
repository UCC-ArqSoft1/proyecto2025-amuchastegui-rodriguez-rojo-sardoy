package utils

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"     // Framework web Gin
	"github.com/golang-jwt/jwt/v5" // Librería JWT v5 para manejo de tokens
)

// Duración del token JWT: 24 horas
const (
	jwtDuration = time.Hour * 24 // El token es válido por 24 horas
	jwtSecret   = "jwtSecret"    // Clave secreta usada para firmar/verificar el token (debería venir de una variable de entorno)
)

// Estructura personalizada para los claims (datos dentro del token)
type CustomClaims struct {
	UserID               int    `json:"user_id"` // ID del usuario autenticado
	Role                 string `json:"role"`    // Rol del usuario ("admin", "socio", etc.)
	jwt.RegisteredClaims        // Claims estándar como expiración, emisión, etc.
}

// Función para generar un token JWT
func GenerateJWT(userID int, role string) (string, error) {
	claims := CustomClaims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(jwtDuration)), // Expira en 24h
			IssuedAt:  jwt.NewNumericDate(time.Now()),                  // Fecha de emisión
			NotBefore: jwt.NewNumericDate(time.Now()),                  // No válido antes de ahora
			Issuer:    "backend",                                       // Quien emite el token
			Subject:   "auth",                                          // Propósito del token
			ID:        fmt.Sprintf("%d", userID),                       // ID único del token
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims) // Crea token usando algoritmo HMAC-SHA256
	return token.SignedString([]byte(jwtSecret))               // Firma el token con la clave secreta y lo devuelve
}

// Función para validar un token JWT y extraer los claims
func ValidateJWT(tokenString string) (*CustomClaims, error) {
	// Parsea el token usando la estructura de claims personalizada
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil // Devuelve la clave para verificar la firma
	})
	if err != nil || !token.Valid {
		return nil, fmt.Errorf("token inválido") // Error si no es válido
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return nil, fmt.Errorf("claims inválidos") // Error si no puede castearlo a CustomClaims
	}

	return claims, nil // Devuelve los claims extraídos
}

// Middleware de autenticación: verifica token y extrae datos
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization") // Toma el header Authorization
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token faltante o inválido"}) // Error 401 si no está presente o mal formado
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ") // Elimina el prefijo "Bearer "

		claims, err := ValidateJWT(tokenStr) // Valida el token
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()}) // Error si es inválido
			return
		}

		// Inserta los datos del token en el contexto de la request
		c.Set("userID", claims.UserID) // Guarda el userID
		c.Set("role", claims.Role)     // Guarda el rol

		c.Next() // Continúa con el siguiente middleware o handler
	}
}
