package handlers

import (
	"net/http"
	"time"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/Renan-Parise/autoease/internal/middlewares"
	"github.com/Renan-Parise/autoease/internal/usecases"
	"github.com/Renan-Parise/autoease/internal/utils"

	"github.com/gin-gonic/gin"
)

type UserRecordHandler struct {
	userRecordUseCase usecases.UserRecordUseCase
}

func NewUserRecordHandler(router *gin.RouterGroup, uru usecases.UserRecordUseCase) {
	handler := &UserRecordHandler{
		userRecordUseCase: uru,
	}

	records := router.Group("/records")
	records.Use(middlewares.JWTAuthMiddleware())
	{
		records.POST("/", handler.CreateUserRecord)
		records.POST("/export", handler.ExportUserRecords)
	}
}

func (h *UserRecordHandler) CreateUserRecord(c *gin.Context) {
	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}
	userID, ok := userIDInterface.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type"})
		return
	}

	var input struct {
		Medicines             []int                    `json:"medicines" binding:"required"`
		Food                  string                   `json:"food"`
		EnvironmentalFactors  []int                    `json:"environmentalFactors"`
		HoursSlept            float64                  `json:"hoursSlept" binding:"required"`
		PhysicalActivityHours float64                  `json:"physicalActivityHours"`
		AdditionalInfo        string                   `json:"additionalInfo"`
		Crisis                bool                     `json:"crisis" binding:"required"`
		CrisisDuration        int                      `json:"crisisDuration"`
		Symptoms              []entities.SymptomDetail `json:"symptoms"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	record := &entities.UserRecord{
		UserID:                userID,
		Medicines:             input.Medicines,
		Food:                  input.Food,
		EnvironmentalFactors:  input.EnvironmentalFactors,
		HoursSlept:            input.HoursSlept,
		PhysicalActivityHours: input.PhysicalActivityHours,
		AdditionalInfo:        input.AdditionalInfo,
		Crisis:                input.Crisis,
		CrisisDuration:        input.CrisisDuration,
		Symptoms:              input.Symptoms,
		CreatedAt:             time.Now(),
	}

	if err := h.userRecordUseCase.CreateUserRecord(record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User record created successfully"})
}

func (h *UserRecordHandler) ExportUserRecords(c *gin.Context) {
	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}
	userID, ok := userIDInterface.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type"})
		return
	}

	var input struct {
		From       string `json:"from" binding:"required"`
		To         string `json:"to" binding:"required"`
		CrisisOnly bool   `json:"crisisOnly"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	fromDate, err := time.Parse("2006-01-02", input.From)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid 'from' date format"})
		return
	}

	toDate, err := time.Parse("2006-01-02", input.To)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid 'to' date format"})
		return
	}

	records, err := h.userRecordUseCase.GetUserRecords(userID, fromDate, toDate, input.CrisisOnly)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	medicines, err := h.userRecordUseCase.GetMedicineNames()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching medicines: " + err.Error()})
		return
	}

	factors, err := h.userRecordUseCase.GetEnvironmentalFactorNames()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching environmental factors: " + err.Error()})
		return
	}

	symptoms, err := h.userRecordUseCase.GetSymptomNames()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching symptoms: " + err.Error()})
		return
	}

	intensities, err := h.userRecordUseCase.GetIntensityNames()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching intensities: " + err.Error()})
		return
	}

	pdfBytes, err := utils.GeneratePDF(records, medicines, factors, symptoms, intensities)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating PDF: " + err.Error()})
		return
	}

	c.Header("Content-Disposition", "attachment; filename=registros.pdf")
	c.Data(http.StatusOK, "application/pdf", pdfBytes)
}
