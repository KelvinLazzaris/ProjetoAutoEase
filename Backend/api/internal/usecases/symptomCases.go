package usecases

import (
	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type SymptomUseCase interface {
	GetSymptoms() ([]*entities.Symptom, error)
}

type symptomUseCase struct {
	symptomRepo repositories.SymptomRepository
}

func NewSymptomUseCase(sr repositories.SymptomRepository) SymptomUseCase {
	return &symptomUseCase{symptomRepo: sr}
}

func (uc *symptomUseCase) GetSymptoms() ([]*entities.Symptom, error) {
	return uc.symptomRepo.GetAll()
}
