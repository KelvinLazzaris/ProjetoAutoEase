package repositories

import (
	"database/sql"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
)

type diseaseRepository struct {
	db *sql.DB
}

func NewDiseaseRepository(db *sql.DB) DiseaseRepository {
	return &diseaseRepository{db: db}
}

func (r *diseaseRepository) GetAll() ([]*entities.Disease, error) {
	query := "SELECT id, name, createdAt, updatedAt FROM diseases"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, errors.NewQueryError("error executing query: " + err.Error())
	}
	defer rows.Close()

	var diseases []*entities.Disease
	for rows.Next() {
		var disease entities.Disease
		err := rows.Scan(&disease.ID, &disease.Name, &disease.CreatedAt, &disease.UpdatedAt)
		if err != nil {
			return nil, errors.NewQueryError("error scanning row: " + err.Error())
		}
		diseases = append(diseases, &disease)
	}

	return diseases, nil
}
