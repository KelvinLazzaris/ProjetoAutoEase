package repositories

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/errors"
)

type UserRecordRepository interface {
	Create(record *entities.UserRecord) error
	GetRecords(userID int64, from, to time.Time, crisisOnly bool) ([]*entities.UserRecord, error)
}

type userRecordRepository struct {
	db *sql.DB
}

func NewUserRecordRepository(db *sql.DB) UserRecordRepository {
	return &userRecordRepository{db: db}
}

func (r *userRecordRepository) Create(record *entities.UserRecord) error {
	query := `INSERT INTO users_records (
        userId, medicines, food, environmentalFactors, hoursSlept, physicalActivityHours,
        additionalInfo, crisis, crisisDuration, symptoms, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	medicinesJSON, err := json.Marshal(record.Medicines)
	if err != nil {
		return errors.NewServiceError("Error marshaling medicines: " + err.Error())
	}

	environmentalFactorsJSON, err := json.Marshal(record.EnvironmentalFactors)
	if err != nil {
		return errors.NewServiceError("Error marshaling environmental factors: " + err.Error())
	}

	symptomsJSON, err := json.Marshal(record.Symptoms)
	if err != nil {
		return errors.NewServiceError("Error marshaling symptoms: " + err.Error())
	}

	stmt, err := r.db.Prepare(query)
	if err != nil {
		return errors.NewQueryError("Error preparing query: " + err.Error())
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		record.UserID,
		medicinesJSON,
		record.Food,
		environmentalFactorsJSON,
		record.HoursSlept,
		record.PhysicalActivityHours,
		record.AdditionalInfo,
		record.Crisis,
		record.CrisisDuration,
		symptomsJSON,
		time.Now(),
	)
	if err != nil {
		return errors.NewQueryError("Error executing query: " + err.Error())
	}

	return nil
}

func (r *userRecordRepository) GetRecords(userID int64, from, to time.Time, crisisOnly bool) ([]*entities.UserRecord, error) {
	query := `SELECT id, userId, medicines, food, environmentalFactors, hoursSlept,
        physicalActivityHours, additionalInfo, crisis, crisisDuration, symptoms, createdAt
        FROM users_records WHERE userId = ? AND createdAt BETWEEN ? AND ?`

	if crisisOnly {
		query += " AND crisis = TRUE"
	}

	rows, err := r.db.Query(query, userID, from, to)
	if err != nil {
		return nil, errors.NewQueryError("Error executing query: " + err.Error())
	}
	defer rows.Close()

	var records []*entities.UserRecord
	for rows.Next() {
		var record entities.UserRecord
		var medicinesJSON, environmentalFactorsJSON, symptomsJSON []byte

		err := rows.Scan(
			&record.ID,
			&record.UserID,
			&medicinesJSON,
			&record.Food,
			&environmentalFactorsJSON,
			&record.HoursSlept,
			&record.PhysicalActivityHours,
			&record.AdditionalInfo,
			&record.Crisis,
			&record.CrisisDuration,
			&symptomsJSON,
			&record.CreatedAt,
		)
		if err != nil {
			return nil, errors.NewQueryError("Error scanning row: " + err.Error())
		}

		err = json.Unmarshal(medicinesJSON, &record.Medicines)
		if err != nil {
			return nil, errors.NewServiceError("Error unmarshaling medicines: " + err.Error())
		}

		err = json.Unmarshal(environmentalFactorsJSON, &record.EnvironmentalFactors)
		if err != nil {
			return nil, errors.NewServiceError("Error unmarshaling environmental factors: " + err.Error())
		}

		err = json.Unmarshal(symptomsJSON, &record.Symptoms)
		if err != nil {
			return nil, errors.NewServiceError("Error unmarshaling symptoms: " + err.Error())
		}

		records = append(records, &record)
	}

	return records, nil
}
