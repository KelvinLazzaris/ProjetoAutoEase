package usecases

import (
	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type MedicineUseCase interface {
	GetMedicines() ([]*entities.Medicine, error)
}

type medicineUseCase struct {
	medicineRepo repositories.MedicineRepository
}

func NewMedicineUseCase(mr repositories.MedicineRepository) MedicineUseCase {
	return &medicineUseCase{medicineRepo: mr}
}

func (uc *medicineUseCase) GetMedicines() ([]*entities.Medicine, error) {
	return uc.medicineRepo.GetAll()
}
