package handlers

import (
	"net/http"

	"github.com/Renan-Parise/autoease/internal/middlewares"
	"github.com/Renan-Parise/autoease/internal/usecases"

	"github.com/gin-gonic/gin"
)

type SymptomHandler struct {
	symptomUseCase usecases.SymptomUseCase
}

func NewSymptomHandler(router *gin.RouterGroup, su usecases.SymptomUseCase) {
	handler := &SymptomHandler{
		symptomUseCase: su,
	}

	symptoms := router.Group("/symptoms")
	symptoms.Use(middlewares.JWTAuthMiddleware())
	{
		symptoms.GET("/", handler.GetSymptoms)
	}
}

func (h *SymptomHandler) GetSymptoms(c *gin.Context) {
	symptoms, err := h.symptomUseCase.GetSymptoms()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, symptoms)
}
