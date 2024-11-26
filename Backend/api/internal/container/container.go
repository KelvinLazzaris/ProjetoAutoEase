package container

import (
	"github.com/Renan-Parise/autoease/internal/db"
	"github.com/Renan-Parise/autoease/internal/repositories"
	"github.com/Renan-Parise/autoease/internal/usecases"
)

type Container struct {
	DiseaseUseCase  usecases.DiseaseUseCase
	MedicineUseCase usecases.MedicineUseCase

	DiseaseRepository             repositories.DiseaseRepository
	MedicineRepository            repositories.MedicineRepository
	EnvironmentalFactorRepository repositories.EnvironmentalFactorRepository
	SymptomRepository             repositories.SymptomRepository
	IntensityRepository           repositories.IntensityRepository
	UserRecordRepository          repositories.UserRecordRepository

	EnvironmentalFactorUseCase usecases.EnvironmentalFactorUseCase
	SymptomUseCase             usecases.SymptomUseCase
	IntensityUseCase           usecases.IntensityUseCase
	UserRecordUseCase          usecases.UserRecordUseCase
}

func NewContainer() *Container {
	database := db.GetDB()

	diseaseRepo := repositories.NewDiseaseRepository(database)
	medicineRepo := repositories.NewMedicineRepository(database)
	environmentalFactorRepo := repositories.NewEnvironmentalFactorRepository(database)
	symptomRepo := repositories.NewSymptomRepository(database)
	intensityRepo := repositories.NewIntensityRepository()
	userRecordRepo := repositories.NewUserRecordRepository(database)

	diseaseUseCase := usecases.NewDiseaseUseCase(diseaseRepo)
	environmentalFactorUseCase := usecases.NewEnvironmentalFactorUseCase(environmentalFactorRepo)
	medicineUseCase := usecases.NewMedicineUseCase(medicineRepo)
	symptomUseCase := usecases.NewSymptomUseCase(symptomRepo)
	intensityUseCase := usecases.NewIntensityUseCase(intensityRepo)
	userRecordUseCase := usecases.NewUserRecordUseCase(userRecordRepo, medicineRepo, environmentalFactorRepo, symptomRepo, intensityRepo)

	return &Container{
		DiseaseRepository:             diseaseRepo,
		MedicineRepository:            medicineRepo,
		EnvironmentalFactorRepository: environmentalFactorRepo,
		SymptomRepository:             symptomRepo,
		IntensityRepository:           intensityRepo,
		UserRecordRepository:          userRecordRepo,
		DiseaseUseCase:                diseaseUseCase,
		MedicineUseCase:               medicineUseCase,
		EnvironmentalFactorUseCase:    environmentalFactorUseCase,
		IntensityUseCase:              intensityUseCase,
		SymptomUseCase:                symptomUseCase,
		UserRecordUseCase:             userRecordUseCase,
	}
}
