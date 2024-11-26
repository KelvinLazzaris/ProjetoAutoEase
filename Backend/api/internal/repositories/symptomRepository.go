package repositories

import (
	"database/sql"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
)

type symptomRepository struct {
	db *sql.DB
}

func NewSymptomRepository(db *sql.DB) SymptomRepository {
	return &symptomRepository{db: db}
}

func (r *symptomRepository) GetAll() ([]*entities.Symptom, error) {
	query := "SELECT id, name, createdAt, updatedAt FROM symptoms"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, errors.NewQueryError("error executing query: " + err.Error())
	}
	defer rows.Close()

	var symptoms []*entities.Symptom
	for rows.Next() {
		var symptom entities.Symptom
		err := rows.Scan(&symptom.ID, &symptom.Name, &symptom.CreatedAt, &symptom.UpdatedAt)
		if err != nil {
			return nil, errors.NewQueryError("error scanning row: " + err.Error())
		}
		symptoms = append(symptoms, &symptom)
	}

	return symptoms, nil
}
