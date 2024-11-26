package handlers

import (
	"net/http"

	"github.com/Renan-Parise/autoease/internal/usecases"

	"github.com/gin-gonic/gin"
)

type DiseaseHandler struct {
	diseaseUseCase usecases.DiseaseUseCase
}

func NewDiseaseHandler(router *gin.RouterGroup, du usecases.DiseaseUseCase) {
	handler := &DiseaseHandler{
		diseaseUseCase: du,
	}

	diseases := router.Group("/diseases")
	diseases.GET("/", handler.GetDiseases)
}

func (h *DiseaseHandler) GetDiseases(c *gin.Context) {
	diseases, err := h.diseaseUseCase.GetDiseases()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, diseases)
}
