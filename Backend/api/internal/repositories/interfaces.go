package repositories

import "github.com/Renan-Parise/autoease/internal/entities"

type DiseaseRepository interface {
	GetAll() ([]*entities.Disease, error)
}

type MedicineRepository interface {
	GetAll() ([]*entities.Medicine, error)
}

type EnvironmentalFactorRepository interface {
	GetAll() ([]*entities.EnvironmentalFactor, error)
}

type SymptomRepository interface {
	GetAll() ([]*entities.Symptom, error)
}

type IntensityRepository interface {
	GetAll() ([]*entities.Intensity, error)
}
