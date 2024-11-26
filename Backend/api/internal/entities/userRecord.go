package entities

import "time"

type SymptomDetail struct {
	SymptomID   int    `json:"symptomId"`
	TimeRange   string `json:"timeRange"`
	Occurrences int    `json:"occurrences"`
	IntensityID int    `json:"intensityId"`
}

type UserRecord struct {
	ID                    int             `json:"id"`
	UserID                int64           `json:"userId"`
	Medicines             []int           `json:"medicines"`
	Food                  string          `json:"food"`
	EnvironmentalFactors  []int           `json:"environmentalFactors"`
	HoursSlept            float64         `json:"hoursSlept"`
	PhysicalActivityHours float64         `json:"physicalActivityHours"`
	AdditionalInfo        string          `json:"additionalInfo"`
	Crisis                bool            `json:"crisis"`
	CrisisDuration        int             `json:"crisisDuration"`
	Symptoms              []SymptomDetail `json:"symptoms"`
	CreatedAt             time.Time       `json:"createdAt"`
}
