package usecases

import (
	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type EnvironmentalFactorUseCase interface {
	GetEnvironmentalFactors() ([]*entities.EnvironmentalFactor, error)
}

type environmentalFactorUseCase struct {
	environmentalFactorRepo repositories.EnvironmentalFactorRepository
}

func NewEnvironmentalFactorUseCase(efr repositories.EnvironmentalFactorRepository) EnvironmentalFactorUseCase {
	return &environmentalFactorUseCase{environmentalFactorRepo: efr}
}

func (uc *environmentalFactorUseCase) GetEnvironmentalFactors() ([]*entities.EnvironmentalFactor, error) {
	return uc.environmentalFactorRepo.GetAll()
}
