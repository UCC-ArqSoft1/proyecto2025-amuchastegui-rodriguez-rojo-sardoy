package db

import (
	"backend/model"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando archivo .env")
	}

	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", user, pass, host, port, name)
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos:", err)
	}

	DB.AutoMigrate(&model.User{}, &model.Activity{}, &model.Inscription{})
	var count int64
	DB.Model(&model.User{}).Where("email = ?", "admin@gym.com").Count(&count)

	if count == 0 {
		admin := model.User{
			FirstName: "Admin",
			LastName:  "Test",
			Email:     "admin@gym.com",
			Password:  "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
			Role:      "admin",
		}
		if err := DB.Create(&admin).Error; err != nil {
			log.Println("Error creando usuario admin:", err)
		} else {
			log.Println("✔️ Usuario admin creado")
		}
	}
}
