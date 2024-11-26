package factories

import (
	"time"

	"github.com/Renan-Parise/autoease/internal/entities"
)

func NewDisease(name string) *entities.Disease {
	now := time.Now()
	return &entities.Disease{
		Name:      name,
		CreatedAt: now,
		UpdatedAt: now,
	}
}
