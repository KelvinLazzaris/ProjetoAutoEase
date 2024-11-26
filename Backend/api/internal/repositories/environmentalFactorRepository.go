package repositories

import (
	"database/sql"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
)

type environmentalFactorRepository struct {
	db *sql.DB
}

func NewEnvironmentalFactorRepository(db *sql.DB) EnvironmentalFactorRepository {
	return &environmentalFactorRepository{db: db}
}

func (r *environmentalFactorRepository) GetAll() ([]*entities.EnvironmentalFactor, error) {
	query := "SELECT id, name, createdAt, updatedAt FROM environmental_factors"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, errors.NewQueryError("error executing query: " + err.Error())
	}
	defer rows.Close()

	var factors []*entities.EnvironmentalFactor
	for rows.Next() {
		var factor entities.EnvironmentalFactor
		err := rows.Scan(&factor.ID, &factor.Name, &factor.CreatedAt, &factor.UpdatedAt)
		if err != nil {
			return nil, errors.NewQueryError("error scanning row: " + err.Error())
		}
		factors = append(factors, &factor)
	}

	return factors, nil
}
