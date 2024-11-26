package usecases

import (
	"time"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
	"github.com/Renan-Parise/autoease/internal/repositories"
)

type UserRecordUseCase interface {
	CreateUserRecord(record *entities.UserRecord) error
	GetUserRecords(userID int64, from, to time.Time, crisisOnly bool) ([]*entities.UserRecord, error)
	GetMedicineNames() (map[int]string, error)
	GetEnvironmentalFactorNames() (map[int]string, error)
	GetSymptomNames() (map[int]string, error)
	GetIntensityNames() (map[int]string, error)
}

type userRecordUseCase struct {
	userRecordRepo          repositories.UserRecordRepository
	medicineRepo            repositories.MedicineRepository
	environmentalFactorRepo repositories.EnvironmentalFactorRepository
	symptomRepo             repositories.SymptomRepository
	intensityRepo           repositories.IntensityRepository
}

func NewUserRecordUseCase(urr repositories.UserRecordRepository, mr repositories.MedicineRepository, efr repositories.EnvironmentalFactorRepository, sr repositories.SymptomRepository, ir repositories.IntensityRepository) UserRecordUseCase {
	return &userRecordUseCase{
		userRecordRepo:          urr,
		medicineRepo:            mr,
		environmentalFactorRepo: efr,
		symptomRepo:             sr,
		intensityRepo:           ir,
	}
}

func (uc *userRecordUseCase) CreateUserRecord(record *entities.UserRecord) error {
	if record.HoursSlept < 0 || record.HoursSlept > 24 {
		return errors.NewValidationError("hoursSlept", "Hours slept must be between 0 and 24")
	}

	return uc.userRecordRepo.Create(record)
}

func (uc *userRecordUseCase) GetUserRecords(userID int64, from, to time.Time, crisisOnly bool) ([]*entities.UserRecord, error) {
	return uc.userRecordRepo.GetRecords(userID, from, to, crisisOnly)
}

func (uc *userRecordUseCase) GetMedicineNames() (map[int]string, error) {
	medicines, err := uc.medicineRepo.GetAll()
	if err != nil {
		return nil, err
	}

	medicineNames := make(map[int]string)
	for _, medicine := range medicines {
		medicineNames[medicine.ID] = medicine.Name
	}
	return medicineNames, nil
}

func (uc *userRecordUseCase) GetEnvironmentalFactorNames() (map[int]string, error) {
	factors, err := uc.environmentalFactorRepo.GetAll()
	if err != nil {
		return nil, err
	}

	factorNames := make(map[int]string)
	for _, factor := range factors {
		factorNames[factor.ID] = factor.Name
	}
	return factorNames, nil
}

func (uc *userRecordUseCase) GetSymptomNames() (map[int]string, error) {
	symptoms, err := uc.symptomRepo.GetAll()
	if err != nil {
		return nil, err
	}

	symptomNames := make(map[int]string)
	for _, symptom := range symptoms {
		symptomNames[symptom.ID] = symptom.Name
	}
	return symptomNames, nil
}

func (uc *userRecordUseCase) GetIntensityNames() (map[int]string, error) {
	intensities, err := uc.intensityRepo.GetAll()
	if err != nil {
		return nil, err
	}

	intensityNames := make(map[int]string)
	for _, intensity := range intensities {
		intensityNames[intensity.ID] = intensity.Name
	}
	return intensityNames, nil
}
