package utils

import (
	"crypto/sha256" // Paquete para aplicar la función hash SHA-256
	"encoding/hex"  // Paquete para codificar en hexadecimal
)

// HashSHA256 aplica la función hash SHA-256 a un string y devuelve el resultado como string hexadecimal
func HashSHA256(value string) string {
	hash := sha256.Sum256([]byte(value)) // Convierte el string a bytes y aplica SHA-256, devuelve un array de 32 bytes
	return hex.EncodeToString(hash[:])   // Convierte ese array de bytes en un string hexadecimal y lo retorna
}
