package handlers

import (
	"net/http"

	"github.com/Renan-Parise/autoease/internal/middlewares"
	"github.com/Renan-Parise/autoease/internal/usecases"

	"github.com/gin-gonic/gin"
)

type MedicineHandler struct {
	medicineUseCase usecases.MedicineUseCase
}

func NewMedicineHandler(router *gin.RouterGroup, mu usecases.MedicineUseCase) {
	handler := &MedicineHandler{
		medicineUseCase: mu,
	}

	medicines := router.Group("/medicines")
	medicines.Use(middlewares.JWTAuthMiddleware())
	{
		medicines.GET("/", handler.GetMedicines)
	}
}

func (h *MedicineHandler) GetMedicines(c *gin.Context) {
	medicines, err := h.medicineUseCase.GetMedicines()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, medicines)
}
