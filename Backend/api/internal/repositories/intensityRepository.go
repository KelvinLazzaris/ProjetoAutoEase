package repositories

import "github.com/Renan-Parise/autoease/internal/entities"

type intensityRepository struct {
	intensities []*entities.Intensity
}

const (
	Low    = 1
	Medium = 2
	High   = 3
)

func NewIntensityRepository() IntensityRepository {
	return &intensityRepository{
		intensities: []*entities.Intensity{
			{ID: Low, Name: "Baixo"},
			{ID: Medium, Name: "Médio"},
			{ID: High, Name: "Alto"},
		},
	}
}

func (r *intensityRepository) GetAll() ([]*entities.Intensity, error) {
	return r.intensities, nil
}
