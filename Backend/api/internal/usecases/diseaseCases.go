package usecases

import (
	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type DiseaseUseCase interface {
	GetDiseases() ([]*entities.Disease, error)
}

type diseaseUseCase struct {
	diseaseRepo repositories.DiseaseRepository
}

func NewDiseaseUseCase(dr repositories.DiseaseRepository) DiseaseUseCase {
	return &diseaseUseCase{diseaseRepo: dr}
}

func (uc *diseaseUseCase) GetDiseases() ([]*entities.Disease, error) {
	return uc.diseaseRepo.GetAll()
}
