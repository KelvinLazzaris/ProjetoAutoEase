package main

import (
	"github.com/Renan-Parise/autoease/internal/container"
	"github.com/Renan-Parise/autoease/internal/db"
	"github.com/Renan-Parise/autoease/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	db.RunMigrations()

	container := container.NewContainer()

	router := gin.Default()

	api := router.Group("/api")
	{
		handlers.NewEnvironmentalFactorHandler(api, container.EnvironmentalFactorUseCase)
		handlers.NewUserRecordHandler(api, container.UserRecordUseCase)
		handlers.NewIntensityHandler(api, container.IntensityUseCase)
		handlers.NewMedicineHandler(api, container.MedicineUseCase)
		handlers.NewDiseaseHandler(api, container.DiseaseUseCase)
		handlers.NewSymptomHandler(api, container.SymptomUseCase)
	}

	router.Run("127.0.0.1:8180")
}
