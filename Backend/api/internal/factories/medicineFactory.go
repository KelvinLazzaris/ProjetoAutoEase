package factories

import (
	"time"

	"github.com/Renan-Parise/autoease/internal/entities"
)

func NewMedicine(name string) *entities.Medicine {
	now := time.Now()
	return &entities.Medicine{
		Name:      name,
		CreatedAt: now,
		UpdatedAt: now,
	}
}
