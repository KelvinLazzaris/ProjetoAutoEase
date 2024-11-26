package usecases

import (
	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type IntensityUseCase interface {
	GetIntensities() ([]*entities.Intensity, error)
}

type intensityUseCase struct {
	intensityRepo repositories.IntensityRepository
}

func NewIntensityUseCase(ir repositories.IntensityRepository) IntensityUseCase {
	return &intensityUseCase{intensityRepo: ir}
}

func (uc *intensityUseCase) GetIntensities() ([]*entities.Intensity, error) {
	return uc.intensityRepo.GetAll()
}
