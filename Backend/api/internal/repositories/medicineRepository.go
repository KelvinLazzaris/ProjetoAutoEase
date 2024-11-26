package repositories

import (
	"database/sql"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
)

type medicineRepository struct {
	db *sql.DB
}

func NewMedicineRepository(db *sql.DB) MedicineRepository {
	return &medicineRepository{db: db}
}

func (r *medicineRepository) GetAll() ([]*entities.Medicine, error) {
	query := "SELECT id, name, createdAt, updatedAt FROM medicines"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, errors.NewQueryError("error executing query: " + err.Error())
	}
	defer rows.Close()

	var medicines []*entities.Medicine
	for rows.Next() {
		var medicine entities.Medicine
		err := rows.Scan(&medicine.ID, &medicine.Name, &medicine.CreatedAt, &medicine.UpdatedAt)
		if err != nil {
			return nil, errors.NewQueryError("error scanning row: " + err.Error())
		}
		medicines = append(medicines, &medicine)
	}

	return medicines, nil
}
