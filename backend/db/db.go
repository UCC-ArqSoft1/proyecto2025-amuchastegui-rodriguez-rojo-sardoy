package db

import (
	"backend/model"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		log.Fatal("La variable de entorno DB_DSN no está definida")
	}

	var err error
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Printf("Intento %d: error al conectar a la base de datos: %v", i+1, err)
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos:", err)
	}

	if err := DB.AutoMigrate(&model.User{}, &model.Activity{}, &model.Inscription{}); err != nil {
		log.Fatal("Error migrando la base de datos:", err)
	}
}
