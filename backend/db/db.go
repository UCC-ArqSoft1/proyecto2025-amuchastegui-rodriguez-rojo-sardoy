package db

import (
	"backend/model"
	"backend/utils"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := os.Getenv("DB_DSN") // Obtiene la cadena de conexión desde variable de entorno
	if dsn == "" {
		log.Fatal("La variable de entorno DB_DSN no está definida") // Corta si no existe
	}

	var err error
	for i := 0; i < 10; i++ {
		// Intenta abrir la conexión a la base de datos
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			break // Si se conecta bien, sale del loop
		}
		log.Printf("Intento %d: error al conectar a la base de datos: %v", i+1, err)
		time.Sleep(3 * time.Second) // Espera antes de reintentar
	}

	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos:", err) // Si falla después de 10 intentos, cierra
	}

	// Realiza migraciones automáticas de las tablas
	if err := DB.AutoMigrate(&model.User{}, &model.Activity{}, &model.Inscription{}); err != nil {
		log.Fatal("Error migrando la base de datos:", err)
	}

	// Crea automáticamente usuarios administradores si no existen
	admins := []model.User{
		{FirstName: "Admin", LastName: "General", Email: "admin@admin.com", Password: utils.HashSHA256("12345"), Role: "admin"},
		{FirstName: "Vice", LastName: "Admin", Email: "vice@admin.com", Password: utils.HashSHA256("12345"), Role: "admin"},
		{FirstName: "Test", LastName: "Admin", Email: "test@admin.com", Password: utils.HashSHA256("12345"), Role: "admin"},
	}

	for _, a := range admins {
		var count int64
		// Verifica si ya existe el admin en la base
		if err := DB.Model(&model.User{}).Where("email = ?", a.Email).Count(&count).Error; err != nil {
			log.Printf("Error verificando existencia de admin %s: %v", a.Email, err)
			continue
		}
		if count == 0 {
			// Si no existe, lo crea
			if err := DB.Create(&a).Error; err != nil {
				log.Printf("Error creando admin %s: %v", a.Email, err)
			} else {
				log.Printf("Usuario admin creado: %s", a.Email)
			}
		} else {
			log.Printf("Usuario admin ya existe: %s", a.Email) // Si ya existe, lo informa
		}
	}
}
